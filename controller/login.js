const hex = require('amrhextotext')

module.exports = {
    async criarSessaoDoLogin(req, res, app){
        var senha 
        const data = await app.DAO.loginDAO.consultarLoginPeloEmail(app, req.query.email)
        if(data){
            senha = hex.hexToUtf8(data.senha)
            if(senha == req.query.senha){
                res.status(200).send({msg: 'senha encontrada', resp: {nome: data.nome, login: data.login, senha: senha}})
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
        console.log('entro aqui')

        await app.DAO.loginDAO.inserirLogin(app, registro).then((respDatabase)=>{
            res.status(200).send({msg: 'login cadastrado', resp: respDatabase})
        }).catch((err)=>{
            res.status(404).send({msg: 'erro ao cadastrar login', resp: err})
        })
    },
    modificarSenha(req, res, app){
        res.send('esqueci minha senha')
    }
}