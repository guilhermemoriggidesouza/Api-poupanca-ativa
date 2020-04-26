const models = require('../models/') 

module.exports = {
    async consultarTodosOsSalariosPoupancasElogins(){
       return await models.login.findAll({
            include: {
                model: models.salario,
                include: {
                    model: models.poupanca
                }
            }
        })
    },

    async inserirSalario(salario){
        return await models.salario.create(salario)
    },
    
    async registrarManipulacaoSalario(salario_descricao){
        return await models.salario_descricao.create(salario_descricao)
    },

    async consultarUltimoSalarioDoUser(idlogin){
        return await models.salario.findOne({
            limit: 1,
            where: {
                idlogin: idlogin
            },
            order: [ [ 'createdAt', 'DESC' ]]
        })
    },

    async consultarSalarioPeloId(idsalario){
        return await models.salario.findOne({
            where: { 
                idsalario: idsalario
            }
        })
    },

    async updateSalario(idsalario, salarioModificado){
        return await models.salario.update(salarioModificado, {
            where:{
                idsalario: idsalario
            }
        })
    },

    async deletarSalarioPeloId(idsalario){
        return await models.salario.destroy({
            where : {
                idsalario: idsalario
            }
        })
    }

}