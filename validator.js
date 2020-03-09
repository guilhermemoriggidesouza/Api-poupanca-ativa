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
    }),

    modificarSenhaParams: Joi.object({
        email: Joi.string().required()
    }),
    modificarSenhaBody:Joi.object({
        senha: Joi.string().required()
    }),


    cadastrarSalario: Joi.object({
        valor_fixo: Joi.number().required(),
        valor_resto: Joi.number().required(),
        idlogin: Joi.number().required()
    })
}