const Joi = require('@hapi/joi');

module.exports = {
    paramsIdSalario: Joi.object({
        idsalario: Joi.number().required()
    }),
    
    paramsIdlogin: Joi.object({
        idlogin: Joi.number().required()
    }),
    
    paramsIdMeta: Joi.object({
        idmeta: Joi.number().required()
    }),

    paramsIdMovSaida: Joi.object({
        idmovsaida: Joi.number().required()
    }),

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
        idlogin: Joi.number().required(),
    }),

    modificarSalarioBody: Joi.object({
        valorModificar: Joi.number().required(),
    }),

    modificarPoupancaBody: Joi.object({
        valorModificar: Joi.number().required(),
    }),
    
    modificarMovSaida: Joi.object({
        valorModificar: Joi.number().required(),
    }),

    cadastrarMeta: Joi.object({
        valor : Joi.number().required(),
        titulo : Joi.string().required(),
        texto : Joi.string().required(),
        idlogin : Joi.number().required()
    }),

    cadastrarMovSaida: Joi.object({
        titulo : Joi.string().required(),
        texto : Joi.string().required(),
        idsalario : Joi.number().required()
    }),
    
}