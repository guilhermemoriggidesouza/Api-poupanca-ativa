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

    async criarNovoBackupDeValor(valor_recuperado){
        return await models.valores_recuperados_salarios.create(valor_recuperado) 
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
    },
    
    async recuperarValorBackupPeloidsalario_vai(idsalario){
        return await models.valores_recuperados_salarios.findOne({
            where: { 
                idsalario_vai: idsalario
            }
        })
    },

    async recuperaSalarioPeloidsalario_vem(idsalario){
        return await models.valores_recuperados_salarios.findOne({
            where: { 
                idsalario_vem: idsalario
            }
        })
    }

}