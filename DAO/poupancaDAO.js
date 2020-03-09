module.exports = {

    async criarPoupanca(app, idSalarioInserido){
        const poupanca = {
            valor: 0,
            idsalario: idSalarioInserido
        }
        return await app.models.poupanca.poupanca.create(poupanca)
    },

}