module.exports = {

    async modificarPoupanca(req, res, app){
        const salarioRecuperadoId = await app.DAO.salarioDAO.consultarSalarioPeloId(app, req.param.idsalario)
        const poupancaRecuperadaSalarioId = await app.DAO.popancaDAO.consultarPoupancaDoSalario(app, req.param.idsalario)
        
        const valorNovoPoupanca = poupancaRecuperadaSalarioId.valor + req.body.valorModificar
        const valorNovoSalario = salarioRecuperadoId - req.body.valorModificar

        console.log(valorNovoPoupanca, valorNovoSalario, req.body.descricao)
    },

    async consultarPoupancaDoSalario(req, res, app){
        res.send('consultar poupanca do salario')
    },

}