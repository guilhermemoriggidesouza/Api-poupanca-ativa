module.exports = {
    async consultarTodosOsSalariosPoupancasElogins(app){
       return await app.models.poupanca.findAll({
            include: app.models.salario
        })
    },

    async inserirSalario(app, salario){
        return await app.models.salario.create(salario)
    },
    
    async registrarManipulacaoSalario(app, salario_descricao){
        return await app.models.salario_descricao.create(salario_descricao)
    },

    async consultarUltimoSalarioDoUser(app, idlogin){
        return await app.models.salario.findOne({
            limit: 1,
            where: {
                idlogin: idlogin
            },
            order: [ [ 'createdAt', 'DESC' ]]
        })
    },

    async consultarSalarioPeloId(app, idsalario){
        return await app.models.salario.findOne({
            where: { 
                idsalario: idsalario
            }
        })
    },

    async updateSalario(app, idsalario, salarioModificado){
        return await app.models.salario.update(salarioModificado, {
            where:{
                idsalario: idsalario
            }
        })
    },

    async deletarSalarioPeloId(app, idsalario){
        return await app.models.salario.destroy({
            where : {
                idsalario: idsalario
            }
        })
    }

}