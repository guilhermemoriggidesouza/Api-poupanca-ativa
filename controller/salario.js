module.exports = {
    async consultarTodosOsSalarios(req, res, app){
        var resp = await app.DAO.salarioDAO.consultarTodosOsSalariosPoupancasElogins(app)
        res.status(200).send(resp)
    },

    async deletarSalario(req, res, app){
        var resp = await app.DAO.salarioDAO.deletarSalarioPeloId(app, req.params.idsalario)
        res.status(200).send({msg:'Numero de registros deletados', resp: resp})
    },

    async cadastrarSalario(req, res, app){
        const today = new Date();
        let msg = ''
        let idSalarioInserido
        let respostaDaRota = {salario:{}, poupanca: {}}
        let valorResto = req.body.valor_resto
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        
        var ultimoSalarioUsuario = await app.DAO.salarioDAO.consultarUltimoSalarioDoUser(app, req.body.idlogin)

        if(ultimoSalarioUsuario){
            valorResto = req.body.valor_resto + ultimoSalarioUsuario.valor_resto
            await app.DAO.salarioDAO.updateSalario(app, ultimoSalarioUsuario.idsalario, { valor_resto: 0 })
                .then((salarioMudado)=>{
                    msg = `resgatado ${parseInt(ultimoSalarioUsuario.valor_resto)} de bonus do ultimo salario, `
                }).catch((err)=>{
                    res.status(404).send({msg: 'erro ao resgatar valor do ultimo salario', resp: err})
                })
        }

        const salario = {
            valor_fixo: req.body.valor_fixo,
            valor_resto: valorResto,
            mes: date,
            idlogin: req.body.idlogin
        }
        await app.DAO.salarioDAO.inserirSalario(app, salario)
            .then(async (salarioInserido)=>{
                msg += 'novo salario cadastrado';
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

        res.status(200).send({msg: msg, resp:respostaDaRota})
    },

    async modificarSalario(req, res, app){
        res.send('modificar salario')
    },
    
    async criarSessaoDoSalario(req, res, app){
        res.send('criar sessao do salario')
    }
}