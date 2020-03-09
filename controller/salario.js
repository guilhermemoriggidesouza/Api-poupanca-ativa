module.exports = {
    async consultarTodosOsSalarios(req, res, app){
        var resp = await app.DAO.salarioDAO.consultarTodosOsSalariosPoupancasElogins(app)
        res.status(200).send(resp)
    },

    async cadastrarSalario(req, res, app){
        const today = new Date();
        let msg = ''
        let idSalarioInserido
        let respostaDaRota = {salario:{}, poupanca: {}}
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        
        var ultimoSalarioUsuario = await app.DAO.salarioDAO.consultarUltimoSalarioDoUser(app, req.body.idlogin)

        await app.DAO.salarioDAO.updateSalario(app, ultimoSalarioUsuario.idsalario, { valor_resto: 0 })
            .then(async (salarioMudado)=>{
                const salario = {
                    valor_fixo: req.body.valor_fixo,
                    valor_resto: req.body.valor_resto + ultimoSalarioUsuario.valor_resto,
                    mes: date,
                    idlogin: req.body.idlogin
                }

                msg = `resgatado ${parseInt(ultimoSalarioUsuario.valor_resto)} de bonus do ultimo salario`
                await app.DAO.salarioDAO.inserirSalario(app, salario).then(async (salarioInserido)=>{
                    msg += ', novo salario cadastrado';
                    idSalarioInserido = salarioInserido.idsalario
                    respostaDaRota.salario = salarioInserido
        
                    await app.DAO.poupancaDAO.criarPoupanca(app, idSalarioInserido).then((poupancaInserida)=>{
                        msg += ' e poupança criada'
                        respostaDaRota.poupanca = poupancaInserida
                    }).catch((err)=>{
                        res.status(404).send({msg: 'erro ao criar poupança', resp: err})
                    })
        
                }).catch((err)=>{
                    res.status(404).send({msg: 'erro ao cadastrar salario', resp: err})
                })

            }).catch((err)=>{
                res.status(404).send({msg: 'erro ao resgatar valor do ultimo salario', resp: err})
            })

        res.status(200).send({msg: msg, resp:respostaDaRota})
    },
    async modificarSalario(req, res, app){
        res.send('modificar salario')
    },
    
    async criarSessaoDoSalario(req, res, app){
        res.send('criar sessao do salario')
    }
}