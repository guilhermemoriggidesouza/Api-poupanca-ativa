const models = require('../models/') 

module.exports = {

    async criarPoupanca(idSalarioInserido){
        const poupanca = {
            valor: 0,
            idsalario: idSalarioInserido
        }
        return await models.poupanca.create(poupanca)
    },

    async consultarPoupancaPeloIdSalario(idSalario){
        return await models.poupanca.findOne({
            where:{
                idsalario: idSalario
            }
        })
    },

    async mudarValorPoupancaPeloIdSalario(valorModificar, idsalario){
        return await models.poupanca.update(valorModificar, {
            where:{
                idsalario: idsalario
            }
        })
    }
}