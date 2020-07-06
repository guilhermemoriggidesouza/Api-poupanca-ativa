module.exports = {
    async consultarMovSaida(req, res, app){
        try{
            let resp = await app.DAO.movSaidaDAO.consultarMovSaidaPeloIdMovSaida(req.params.idmovsaida)
            res.status(200).send({msg: "Movimento de saída consultadas com sucesso", resp: resp})
        }catch(err){
            res.status(404).send({msg: "Erro ao consultar movimentos de saída", resp: err})
        }
    },

    async cadastrarMovSaida(req, res, app){
        await app.DAO.movSaidaDAO.cadastrarMovSaida({
            valor: 0.0,
            titulo: req.body.titulo,
            texto: req.body.texto,
            status: "p",
            idsalario: req.body.idsalario,
        })
        .then((result) => res.status(200).send({msg: "Movimento saida cadastrada com sucesso", resp: result}))
        .catch((err) => res.status(404).send({msg: "Erro ao cadastrar o movimento saída", resp: err}))
    },

    async deletarMovSaida(req, res, app){
        try{
            var deleteMovSaida = await app.DAO.movSaidaDAO.deletarMovSaidaPeloIdMovSaida(req.params.idmovsaida) 
            res.status(200).send({msg:'Numero de registros deletados', resp: deleteMovSaida})
        }catch(err){
            res.status(200).send({msg:'Erro ao deletar registro', resp: err})
        }
    },

    async modificarMovSaida(req, res, app){
        let newValorResto = 0.0
        let salarioRecuperadoId = {}
        let movSaidaRecuperadoPorId = {}
        try{
            movSaidaRecuperadoPorId = await app.DAO.movSaidaDAO.consultarMovSaidaPeloIdMovSaida(req.params.idmovsaida)
            salarioRecuperadoId = await app.DAO.salarioDAO.consultarSalarioPeloId(movSaidaRecuperadoPorId.idsalario)

            newValorResto = salarioRecuperadoId.valor_resto - req.body.valorModificar
        }catch(err){
            res.status(404).send({msg: "não foi possível achar MovSaida ou salario", resp: {id_movsaida: req.params.idmovsaida}})
            return
        }

        if(newValorResto < 0){
            res.status(404).send({msg: 'valor de movimento saida excede valor do salario sobrando', resp:{valoSalario: salarioRecuperadoId.valor_resto, valorMovSaida: req.body.valorModificar}})
            return
        }

        await app.DAO.salarioDAO.updateSalario(movSaidaRecuperadoPorId.idsalario, {
            valor_resto: newValorResto,
        })
        .then(async()=> {
            app.DAO.salarioDAO.registrarManipulacaoSalario({
                valor: req.body.valorModificar*-1,
                descricao: 'retirado salario por movimentação de saida ',
                idsalario: movSaidaRecuperadoPorId.idsalario
            })

            await app.DAO.movSaidaDAO.modificarMovSaidaPeloIdMovSaida(req.params.idmovsaida, {valor:req.body.valorModificar, status: 'c'})
                .then((valorModificado) => res.status(200).send({msg: 'Movimento concluido com sucesso', resp:valorModificado}))
                .catch((error) => res.status(200).send({msg: 'erro ao tentar concluir movimento', resp: error}))
        })
        .catch((err)=>res.status(404).send({msg: 'erro ao modificar salario', resp: err}))
    }
}