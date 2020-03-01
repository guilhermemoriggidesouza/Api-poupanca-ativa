const Joi = require('@hapi/joi');

module.exports = {
    
    criarSessaoDoLogin: Joi.object({
        email: Joi.string().required(),
        senha: Joi.string().required()
    }),

    cadastrarLogin: Joi.object({
        email:Joi.string().required(),
        nome: Joi.string().required(),
        senha: Joi.string().required(),
    })
}