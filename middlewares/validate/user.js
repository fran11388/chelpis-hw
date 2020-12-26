const Joi = require('joi');

exports.register = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .required(),
        password: Joi.string()
            .min(6)
            .max(30)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        role: Joi.string()
            .required(),

    }).unknown();

    const result = schema.validate(req.body);
    if (result.error != null) {
        return res.status(400).json({message: result.error.message});
    }

    next();
};

exports.login = (req, res, next) => {
    const schema = Joi.object({
        password: Joi.string()
            .required(),
        email: Joi.string()
            .required(),

    }).unknown();

    const result = schema.validate(req.body);
    if (result.error != null) {
        return res.status(400).json({message: result.error.message});
    }

    next();
};