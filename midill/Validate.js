const yup = require('yup');
const validate = async function (req, res, next) {
  try {
    const schema = yup.object().shape({
      name: yup.string().required('Name is required'),
      email: yup.string().email().required('Email is required'),
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
})









      

    });

    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = validate;
