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
    },

    async deletarMetasPeloIdMeta(idmeta){
        return await models.metas.destroy({
            where : {
                idmeta: idmeta
            }
        })
    },

    async mudarMetasPeloIdmeta(valorMudado, idmeta){
        return await models.metas.update(valorMudado, {
            where:{
                idmeta: idmeta
            },
            limit: 1
        })
    }
}