const validator = require('express-joi-validation').createValidator({})


module.exports = function(app){
    app.get(
        '/login', 
        validator.query(app.validator.criarSessaoDoLogin), 
        (req, res) => app.controller.login.criarSessaoDoLogin(req, res, app)
    )

    app.post(
        '/login', 
        validator.body(app.validator.cadastrarLogin), 
        (req, res) => app.controller.login.cadastrarLogin(req, res, app)
    )

    app.put(
        '/login/:email',
        validator.body(app.validator.modificarSenhaBody), 
        validator.params(app.validator.modificarSenhaParams), 
        (req, res) => app.controller.login.modificarSenha(req, res, app)
    )



    app.post(
        '/salario', 
        validator.body(app.validator.cadastrarSalario), 
        (req, res) => app.controller.salario.cadastrarSalario(req, res, app)
    )

    app.get(
        '/salario/:idlogin', 
        validator.params(app.validator.paramsIdlogin), 
        (req, res) => app.controller.salario.consultarTodosOsSalariosPeloLogin(req, res, app)
    )

    app.delete(
        '/salario/:idsalario', 
        validator.params(app.validator.paramsIdSalario), 
        (req, res) => app.controller.salario.deletarSalario(req, res, app)
    )
    
    app.put(
        '/salario/:idsalario',
        validator.params(app.validator.paramsIdSalario),
        validator.body(app.validator.modificarSalarioBody),
        (req, res) => app.controller.salario.modificarSalario(req, res, app)
    )

    app.get(
        '/salario/session/:idsalario', 
        validator.params(app.validator.paramsIdSalario), 
        (req, res) => app.controller.salario.criarSessaoDoSalario(req, res, app)
    )



    app.put(
        '/poupanca/:idsalario', 
        validator.params(app.validator.paramsIdSalario), 
        validator.body(app.validator.modificarPoupancaBody), 
        (req, res) => app.controller.poupanca.modificarPoupanca(req, res, app)
    )

    app.get(
        '/poupanca/unico/:idsalario', 
        validator.params(app.validator.paramsIdSalario), 
        (req, res) => app.controller.poupanca.consultarPoupancaDoSalario(req, res, app)
    )

    app.get(
        '/poupanca/total/:idlogin', 
        validator.params(app.validator.paramsIdlogin), 
        (req, res) => app.controller.poupanca.consultarPoupancaPeloLogin(req, res, app)
    )



    app.get(
        '/metas/:idlogin', 
        validator.params(app.validator.paramsIdlogin),
        (req, res) => app.controller.metas.consultarMetas(req, res, app)
    )
    
    app.post(
        '/metas', 
        validator.body(app.validator.cadastrarMeta),
        (req, res) => app.controller.metas.cadastrarMetas(req, res, app)
    )

    app.put(
        '/metas/:idmeta', 
        validator.params(app.validator.paramsIdMeta),
        (req, res) => app.controller.metas.modificarMetas(req, res, app)
    )

    app.delete(
        '/metas/:idmeta', 
        validator.params(app.validator.paramsIdMeta),
        (req, res) => app.controller.metas.deletarMetas(req, res, app)
    )



    app.get(
        '/movSaida/:idsalario',
        validator.params(app.validator.paramsIdSalario),
        (req, res) => app.controller.movSaida.consultarMovSaida(req, res, app)
    )

    app.post(
        '/movSaida', 
        validator.body(app.validator.cadastrarMovSaida),
        (req, res) => app.controller.movSaida.cadastrarMovSaida(req, res, app)
    )

    app.delete(
        '/movSaida/:idmovsaida', 
        validator.params(app.validator.paramsIdMovSaida),
        (req, res) => app.controller.movSaida.deletarMovSaida(req, res, app)
    )

    app.put(
        '/movSaida/:idmovsaida', 
        validator.params(app.validator.paramsIdMovSaida),
        validator.body(app.validator.modificarMovSaida),
        (req, res) => app.controller.movSaida.modificarMovSaida(req, res, app)
    )


    //app test
    app.get('/testeapp', (req, res)=>{
        app.controller.zerar.insertDados(req, res, app)
    })
}