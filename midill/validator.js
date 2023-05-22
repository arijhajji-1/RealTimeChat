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



/*
String Validation:
Minimum length: yup.string().min(6, "String must have at least 6 characters")
Maximum length: yup.string().max(20, "String cannot exceed 20 characters")
Exact length: yup.string().length(10, "String must have exactly 10 characters")
Regex pattern: yup.string().matches(/^[a-zA-Z0-9]+$/, "String must contain only alphanumeric characters")
Inclusion of specific values: yup.string().oneOf(["apple", "banana", "orange"], "Invalid fruit name")
Number Validation:

Minimum value: yup.number().min(0, "Number must be greater than or equal to 0")
Maximum value: yup.number().max(100, "Number must be less than or equal to 100")
Integer only: yup.number().integer("Number must be an integer")
Positive number: yup.number().positive("Number must be positive")
Negative number: yup.number().negative("Number must be negative")
Boolean Validation:

Required boolean value: yup.boolean().required("Boolean value is required")
Date Validation:

Minimum date: yup.date().min(new Date(), "Date must be in the future")
Maximum date: yup.date().max(new Date(2023, 0, 1), "Date cannot exceed January 1, 2023")
Array Validation:

Minimum length: yup.array().min(3, "Array must have at least 3 elements")
Maximum length: yup.array().max(10, "Array cannot exceed 10 elements")
Exact length: yup.array().length(5, "Array must have exactly 5 elements")
Type validation for array elements: yup.array().of(yup.number().required("Array element must be a number"))

*/
module.exports = validate;
