module.exports = {
    async consultarTodosOsSalariosPoupancasElogins(app){
       return await app.models.poupanca.poupanca.findAll({
            include:[{
                model: app.models.salario.salario,
                include:[{
                    model: app.models.login.login
                }]
            }]
        })
    },

    async inserirSalario(app, salario){
        return await app.models.salario.salario.create(salario)
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

    async updateSalario(app, idsalario, salarioModificado){
        return await app.models.salario.salario.update(salarioModificado, {
            where:{
                idsalario: idsalario
            }
        })
    }

}