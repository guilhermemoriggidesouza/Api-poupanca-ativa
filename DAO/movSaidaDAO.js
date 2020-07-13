const models = require('../models') 

module.exports = {
    async cadastrarMovSaida(mov_saida){
        return await models.mov_saida.create(mov_saida)
    },

    async consultarMovSaidaPeloIdSalario(idsalario){
        return await models.mov_saida.findAll({
            where: {
                idsalario : idsalario
            }
        })
    },

    async consultarMovSaidaPeloIdMovSaida(idmov_saida){
        return await models.mov_saida.findOne({
            where: {
                idmov_saida : idmov_saida
            }
        })
    },

    async deletarMovSaidaPeloIdMovSaida(idmov_saida){
        return await models.mov_saida.destroy({
            where : {
                idmov_saida: idmov_saida
            }
        })
    },

    async modificarMovSaidaPeloIdMovSaida(idmov_saida, valorModificado){
        return await models.mov_saida.update(valorModificado, {
            where:{
                idmov_saida: idmov_saida
            }
        })
    }
}