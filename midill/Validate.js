const yup = require('yup');
const validate = async function (req, res, next) {
  try {
    const schema = yup.object().shape({
      name: yup.string().required('Name is required'),
      email: yup.string().email().required('Email is required'),
      cin: yup.string().required('Cin is required'),
        image: yup.string().required('Image is required'),
    });

    await schema.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = validate;
