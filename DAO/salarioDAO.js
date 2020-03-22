module.exports = {
    async consultarTodosOsSalariosPoupancasElogins(app){
       return await app.models.poupanca.poupanca.findAll({
            include:[{
                model: app.models.salario.salario,
                include:[{
                    model: app.models.salario_descricao.salario_descricao
                },{
                    model: app.models.login.login
                }]
            }]
        })
    },

    async inserirSalario(app, salario){
        return await app.models.salario.salario.create(salario)
    },
    
    async registrarManipulacaoSalario(app, salario_descricao){
        return await app.models.salario_descricao.salario_descricao.create(salario_descricao)
    },

    async consultarUltimoSalarioDoUser(app, idlogin){
        return await app.models.salario.salario.findOne({
            limit: 1,
            where: {
                idlogin: idlogin
            },
            order: [ [ 'createdAt', 'DESC' ]]
        })
    },

    async consultarSalarioPeloId(app, idsalario){
        return await app.models.salario.salario.findOne({
            where: { 
                idsalario: idsalario
            }
        })
    },

    async updateSalario(app, idsalario, salarioModificado){
        return await app.models.salario.salario.update(salarioModificado, {
            where:{
                idsalario: idsalario
            }
        })
    },

    async deletarSalarioPeloId(app, idsalario){
        return await app.models.salario.salario.destroy({
            where : {
                idsalario: idsalario
            }
        })
    }

}