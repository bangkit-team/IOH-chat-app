const Joi = require('joi');

const registerValidation = (data) =>{
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().required().min(6),
        fpassword: Joi.ref('password'),
        profile_pict: Joi.string(),
        phone_number: Joi.string().min(6).max(14),
        role: Joi.string() 
    })
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().required().min(6)
    })
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;