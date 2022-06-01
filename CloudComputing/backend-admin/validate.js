const Joi = require('joi');

const loginAdminValidation = (data) =>{
    const schema = Joi.object({
        username: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().alphanum().min(6).max(15)
    })
    return schema.validate(data);
}

module.exports.loginAdminValidation = loginAdminValidation;
