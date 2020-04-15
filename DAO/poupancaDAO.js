module.exports = {

    async criarPoupanca(app, idSalarioInserido){
        const poupanca = {
            valor: 0,
            idsalario: idSalarioInserido
        }
        return await app.models.poupanca.create(poupanca)
    },

    async consultarPoupancaPeloIdSalario(app, idSalario){
        return await app.models.poupanca.findOne({
            where:{
                idsalario: idSalario
            }
        })
    },

    async mudarValorPoupancaPeloIdSalario(app, valorModificar, idsalario){
        return await app.models.poupanca.update(valorModificar, {
            where:{
                idsalario: idsalario
            }
        })
    }
}