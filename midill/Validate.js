const yup = require('yup');
const validate = async function (req, res, next) {
  try {
    const schema = yup.object().shape({
      name: yup.string().required('Name is required'),
      email: yup.string().email().required('Email is required'),
      cin: yup.string().required('Cin is required'),
//only jpg png and jpeg allowed 
image: yup.string().test('file-type', 'File type is not allowed', (value) => {
        const extension = ['jpg', 'png', 'jpeg'];
        const ext = value.split('.').pop().toLowerCase();
        return extension.includes(ext);
        }),

      image: yup.string().test('is-valid-file', 'Image is required', function(value) {
        return !!req.file && !!req.file.originalname;
        
      }).test('file-type', 'File type is not allowed', (value) => {
        const extension = ['jpg', 'png', 'jpeg'];
        const ext = value.split('.').pop().toLowerCase();
        return extension.includes(ext);
        }),
      








      

    });

    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = validate;
