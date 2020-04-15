module.exports = {

    async modificarPoupanca(req, res, app){
        // console.log(req.params.idsalario)
        const salarioRecuperadoId = await app.DAO.salarioDAO.consultarSalarioPeloId(app, req.params.idsalario)
        const poupancaRecuperadaSalarioId = await app.DAO.poupancaDAO.consultarPoupancaPeloIdSalario(app, req.params.idsalario)
        
        const valorNovoPoupanca = poupancaRecuperadaSalarioId.valor + req.body.valorModificar
        const valorNovoSalario = salarioRecuperadoId.valor_resto - req.body.valorModificar

        console.log(salarioRecuperadoId.valor_resto)
        console.log(valorNovoPoupanca, valorNovoSalario, req.body.descricao)

        if(valorNovoPoupanca > 0){
            console.log(req.params.idsalario)
            await app.DAO.poupancaDAO.mudarValorPoupancaPeloIdSalario(app, {valor: valorNovoPoupanca}, req.params.idsalario).then((result)=>{
                console.log(result)
                res.status(200).send(result)
            }).catch((err)=>{
                res.status(404).send({msg: 'error ao mudar poupanca', resp:err})
            })

        }else{
            res.status(404).send({msg: 'valor informado tira mais que o valor da poupanca neste salario', resp: valorNovoPoupanca})
        }
    },

    async consultarPoupancaDoSalario(req, res, app){
        res.send('consultar poupanca do salario')
    },

}