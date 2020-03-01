const hex = require('amrhextotext')

module.exports = {
    async criarSessaoDoLogin(req, res, app){
        app.DAO.loginDAO.consultarLoginPeloEmail(app, req.body.email).then((data)=>{
            console.log(data)
        })
    },
    async cadastrarLogin(req, res, app){
        const registro = {
            login: req.body.email,
            senha: hex.textToHex(req.body.senha),
            nome: req.body.nome
        }

        var teste = await app.DAO.loginDAO.inserirLogin(app, registro)
        teste.then((respDatabase)=>{
            res.status(200).send({msg: 'teste', resp: respDatabase})
        }).catch((err)=>{
            res.status(404).send({msg: 'deu ruim', resp: err})
        })
    },
    modificarSenha(req, res, app){
        res.send('esqueci minha senha')
    }
}