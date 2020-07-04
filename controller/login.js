const hex = require('amrhextotext')

module.exports = {
    async criarSessaoDoLogin(req, res, app){
        var senha 
        const data = await app.DAO.loginDAO.consultarLoginPeloEmail(req.query.email)
        if(data){
            senha = hex.hexToUtf8(data.senha)
            if(senha == req.query.senha){
                res.status(200).send({msg: 'senha encontrada', resp: {data}})
            }else{
                res.status(404).send({msg: 'senha não encontrada'})
            }
        }else{
            res.status(404).send({msg: 'email nao encontrado'})
        }
    },

    async cadastrarLogin(req, res, app){
        const registro = {
            login: req.body.email,
            senha: hex.textToHex(req.body.senha),
            nome: req.body.nome
        }
        
        await app.DAO.loginDAO.inserirLogin(registro).then((loginInserido)=>{
            res.status(200).send({msg: 'login cadastrado', resp: loginInserido})
        }).catch((err)=>{
            res.status(404).send({msg: 'erro ao cadastrar login', resp: err})
        })
    },

    async modificarSenha(req, res, app){
        var senha = hex.textToHex(req.body.senha)

        await app.DAO.loginDAO.mudarSenhaPeloEmail(req.params.email, senha).then((loginMudado)=>{
            if(loginMudado[0] >= 1){
                res.status(200).send({msg: 'senha mudada com sucesso', resp: loginMudado})
            }else{
                res.status(404).send({msg: 'nao foi possivel mudar a senha', resp: loginMudado})
            }
        }).catch(()=>{
            res.status(404).send({msg: 'erro ao mudar a senha', resp: loginMudado})
        })
    }
}