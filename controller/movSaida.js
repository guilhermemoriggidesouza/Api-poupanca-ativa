module.exports = {
    async consultarMovSaida(req, res, app){
        try{
            let resp = await app.DAO.movSaidaDAO.consultarMovSaidaPeloLogin(req.params.idlogin)
            res.status(200).send({msg: "Movimento de saída consultadas com sucesso", resp: resp})
        }catch(err){
            res.status(404).send({msg: "Erro ao consultar movimentos de saída", resp: resp})
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
        res.send('criar sessao do salario')
    }
}