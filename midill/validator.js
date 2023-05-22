const yup = require('yup');
const Plat = require ("../models/Plat")
const validate = async function (req, res, next) {
  try {
    const schema = yup.object().shape({

       
        
        plat_name :yup.string().max(8, 'Plat name must not exceed 8 characters').required('Plat name is required')
        .test('checkPlatName', 'Plat name already exists', async (value) => {
            const plat = await Plat.findOne({ plat_name: value });
            if (plat) return false;
            return true;
            }),

       

        nbre_ingredient:yup.number().positive().max(5, 'Nbre ingredient must not exceed 5 characters'),   
        description:yup.string().matches(/^[a-zA-Z]+$/).required('Description is required'),
      
     
    });

    await schema.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = validate;
