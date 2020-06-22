const models = require('../models') 

module.exports = {
    async cadastrarMovSaida(mov_saida){
        return await models.mov_saida.create(mov_saida)
    },

    async consultarMovSaidaPeloLogin(idlogin){
        return await models.mov_saida.findAll({
            where: {
                idlogin : idlogin
            }
        })
    },

    async deletarMovSaidaPeloIdMovSaida(idmov_saida){
        return await models.mov_saida.destroy({
            where : {
                idmov_saida: idmov_saida
            }
        })
    }
}