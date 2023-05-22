const yup = require('yup');
const User = require ("../models/user")
const validate = async function (req, res, next) {
  try {
    const schema = yup.object().shape({
      name: yup.string().required('Name is required'),
      //champs email required and unique
      email: yup.string().email('Email is invalid').required('Email is required').
      test('checkEmail', 'Email already exists', async (value) => {
        const user = await User.findOne({ email: value });
        if (user) return false;

        return true;
      }),

      cin: yup.string().required('Cin is required'),

      image: yup.string().test('is-valid-file', 'Image is required', function(value) {
        return !!req.file && !!req.file.originalname;
      })
.test('is-valid-file-type', 'Image is not valid', function(value) {
  return (

    req.file.mimetype === 'image/png' ||
    req.file.mimetype === 'image/jpg' ||
    req.file.mimetype === 'image/jpeg'

  );
}),
telephone: yup
.number()
.typeError('Telephone must be a number')
.integer('Telephone must be an integer')
.test('is-eight-digits', 'Telephone must be exactly 8 digits', (value) => {
  if (value) {
    const phoneNumber = value.toString();
    return phoneNumber.length === 8;
  }
  return false;
}),
//color: yup.string().oneOf(['red', 'green', 'blue'], 'Invalid color'),
//  address: yup.string().nullable(),
//  postalCode: yup.string().matches(/^\d{5}$/, 'Invalid postal code'),



    });
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    if (error.inner) {
      const errors = error.inner.map((err) => err.message);
      res.status(400).json({ errors });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = validate;
