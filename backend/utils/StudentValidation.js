const password_complexity = require('joi-password-complexity')
const Joi = require('joi')

// student validation 

function validateStudent(student) {
    const studentSchema =Joi.object({
        firstName:Joi.string().required(),
        lastName :Joi.string().required(),
        email:Joi.string().email().required(),
        password:password_complexity(),
        

        
    })

    return studentSchema.validate(student)
}
module.exports.validate = validateStudent ;