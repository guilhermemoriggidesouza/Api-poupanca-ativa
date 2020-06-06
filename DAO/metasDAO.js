const models = require('../models/') 

module.exports = {
    async cadastrarMeta(meta){
        return await models.metas.create(meta)
    },

    async consultarMetaPeloLogin(idlogin){
        return await models.metas.findAll({
            where: {
                idlogin : idlogin
            }
        })
    }
}