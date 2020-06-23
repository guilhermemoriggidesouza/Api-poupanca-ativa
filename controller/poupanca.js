module.exports = {

    async modificarPoupanca(req, res, app){
        let valorNovoPoupanca = 0.0
        let valorNovoSalario = 0.0
        let salarioRecuperadoId = {}
        let poupancaRecuperadaSalarioId = {}

        try{
            salarioRecuperadoId = await app.DAO.salarioDAO.consultarSalarioPeloId(req.params.idsalario)
            poupancaRecuperadaSalarioId = await app.DAO.poupancaDAO.consultarPoupancaPeloIdSalario(req.params.idsalario)

            valorNovoPoupanca = poupancaRecuperadaSalarioId.valor + req.body.valorModificar
            valorNovoSalario = salarioRecuperadoId.valor_resto - req.body.valorModificar
        }catch(error){
            res.status(404).send({msg: "não foi possível achar poupanca ou salario", resp: {poupanca: poupancaRecuperadaSalarioId, salario: salarioRecuperadoId}})
            return
        }

        if(valorNovoSalario < 0 || salarioRecuperadoId.valor_resto == 0){
            res.status(404).send({msg: "valor tirado do salario excede valor existente", resp: {valorExistente: salarioRecuperadoId.valor_resto, novoValor: valorNovoSalario}})
            return
        }

        if(valorNovoPoupanca < 0){
            res.status(404).send({msg: 'valor informado tira mais que o valor da poupanca neste salario', resp: {valorPoupanca: poupancaRecuperadaSalarioId.valor, valorSubtraido: valorNovoPoupanca}})
            return
        }

        await app.DAO.poupancaDAO.mudarValorPoupancaPeloIdSalario({valor: valorNovoPoupanca}, req.params.idsalario).then(async (result)=>{
            if(result[0] >= 1){
                console.log(valorNovoSalario, salarioRecuperadoId.valor_resto, req.body.valorModificar)
                await app.DAO.salarioDAO.updateSalario(req.params.idsalario, {valor_resto: valorNovoSalario}).then((resultSalario)=>{
                    app.DAO.salarioDAO.registrarManipulacaoSalario({valor: (req.body.valorModificar*-1), descricao: req.body.descricao, idsalario: req.params.idsalario})

                    res.status(200).send({msg: 'valor modificado no salario e modificado na poupanca', resp:resultSalario})
                }).catch((err)=>{
                    res.status(404).send({msg: 'error ao mudar o salario', resp:err})
                })
            }else{
                throw {
                    numberUpdate: result
                }
            }
        }).catch((err)=>{
            res.status(404).send({msg: 'error ao mudar poupanca', resp:err})
        })
    },

    async consultarPoupancaDoSalario(req, res, app){
        try{
            poupancaRecuperadaSalarioId = await app.DAO.poupancaDAO.consultarPoupancaPeloIdSalario(req.params.idsalario)
            res.status(200).send({msg: "poupanca recuperada com sucesso", resp: poupancaRecuperadaSalarioId})
        }catch(err){
            res.status(404).send({msg:"erro ao recuperar poupanca", resp: err})
        }
    },

    async consultarPoupancaPeloLogin(req, res, app){
        try{
            poupancaRecuperadaSalarioId = await app.DAO.poupancaDAO.consultarPoupancaPeloIdLogin(req.params.idlogin)
            res.status(200).send({msg: "poupanca recuperada com sucesso", resp: poupancaRecuperadaSalarioId})
        }catch{
            res.status(404).send({msg:"erro ao recuperar poupanca", resp: err})
        }
    }

}