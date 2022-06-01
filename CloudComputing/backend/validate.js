const Joi = require('joi');

const registerValidation = (data) =>{
    const schema = Joi.object({
        name: Joi.string().required(),
        tanggal_lahir: Joi.string().required(),
        posisi: Joi.string().required(),
        divisi_kerja: Joi.string().required(),
        email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().required().min(6),
        fpassword: Joi.ref('password'),
        phone_number: Joi.string().min(6).max(14),
    })
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().required().min(6)
    })
    return schema.validate(data);
};

const updateUserValidation = (data) =>{
    const schema = Joi.object({
        name: Joi.string().required(),
        phone_number: Joi.string().required(),
        tanggal_lahir: Joi.string().required(),
        posisi: Joi.string().required(),
        divisi_kerja: Joi.string().required(),
        about: Joi.string().required().max(50),
    })
    return schema.validate(data);
};

const updateGroupValidation = (data) =>{
    const schema = Joi.object({
        name: Joi.string().alphanum().required(),
        deskripsi: Joi.string().alphanum().required()
    })
    return schema.validate(data);
}

const feedbackValidation = (data) =>{
    const schema = Joi.object({
        feedback: Joi.string().alphanum().required()
    })
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.updateUserValidation = updateUserValidation;
module.exports.updateGroupValidation = updateGroupValidation;
module.exports.feedbackValidation = feedbackValidation;