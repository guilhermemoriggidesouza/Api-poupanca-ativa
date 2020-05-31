const validator = require('express-joi-validation').createValidator({})

module.exports = function(app){
    app.get('/login', validator.query(app.validator.criarSessaoDoLogin), (req, res)=>{
        app.controller.login.criarSessaoDoLogin(req, res, app)
    })

    app.post('/login', validator.body(app.validator.cadastrarLogin), (req, res)=>{
        app.controller.login.cadastrarLogin(req, res, app)
    })

    app.put('/login/:email',
        validator.body(app.validator.modificarSenhaBody), 
        validator.params(app.validator.modificarSenhaParams), 
        (req, res) => {
        app.controller.login.modificarSenha(req, res, app)
    })



    app.post('/salario', validator.body(app.validator.cadastrarSalario), (req, res) =>{
        app.controller.salario.cadastrarSalario(req, res, app)
    })

    app.get('/salario', (req, res)=>{
        app.controller.salario.consultarTodosOsSalarios(req, res, app)
    })

    app.delete('/salario/:idsalario', validator.params(app.validator.paramsIdSalario), (req, res)=>{
        app.controller.salario.deletarSalario(req, res, app)
    })
    
    app.put('/salario/:idsalario',
        validator.params(app.validator.paramsIdSalario),
        validator.body(app.validator.modificarSalarioBody),
        (req, res)=>{
        app.controller.salario.modificarSalario(req, res, app)
    })

    app.get('/salario/session/:idsalario', validator.params(app.validator.paramsIdSalario), (req, res)=>{
        app.controller.salario.criarSessaoDoSalario(req, res, app)
    })



    app.put('/poupanca/:idsalario', 
            validator.params(app.validator.paramsIdSalario), 
            validator.body(app.validator.modificarPoupancaBody), 
            (req, res)=>{
        app.controller.poupanca.modificarPoupanca(req, res, app)
    })

    app.get('/poupanca/:idsalario', (req, res)=>{
        app.controller.poupanca.consultarPoupancaDoSalario(req, res, app)
    })



    app.get('/metas', (req, res)=>{
        app.controller.metas.consultarMetas(req, res, app)
    })
    
    app.post('/metas', (req, res)=>{
        app.controller.metas.cadastrarMetas(req, res, app)
    })

    app.put('/metas:idmetas', (req, res)=>{
        app.controller.metas.modificarMetas(req, res, app)
    })

    app.delete('/metas:idmetas', (req, res)=>{
        app.controlller.metas.deletarMetas(req, res, app)
    })



    app.get('/movSaida', (req, res)=>{
        app.controller.movSaida.consultarMovSaida(req, res, app)
    })

    app.post('/movSaida', (req, res)=>{
        app.controller.movSaida.cadastrarMovSaida(req, res, app)
    })

    app.delete('/movSaida:idmovSaida', (req, res)=>{
        app.controlller.movSaida.deletarMovSaida(req, res, app)
    })

    app.put('/movSaida:idmovSaida', (req, res)=>{
        app.controller.movSaida.modificarMovSaida(req, res, app)
    })


    //app test
    app.get('/testeapp', (req, res)=>{
        app.controller.zerar.insertDados(req, res, app)
    })
}