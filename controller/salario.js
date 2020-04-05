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

                await app.DAO.salarioDAO.registrarManipulacaoSalario(app, {
                    valor: req.body.valor_fixo,
                    descricao: req.body.descricao,
                    idsalario: idSalarioInserido
                })
    
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
        const salarioRecuperadoId = await app.DAO.salarioDAO.consultarSalarioPeloId(app, req.params.idsalario)
        const newValorResto = parseFloat(salarioRecuperadoId.valor_resto)+ req.body.valorModificar
        const newValorFixo = parseFloat(salarioRecuperadoId.valor_fixo) + req.body.valorModificar

        await app.DAO.salarioDAO.updateSalario(app, req.params.idsalario, {
            valor_resto: newValorResto,
            valor_fixo: newValorFixo
        }).then(async (resp)=>{

            await app.DAO.salarioDAO.registrarManipulacaoSalario(app, {
                valor: req.body.valorModificar,
                descricao: req.body.descricao,
                idsalario: req.params.idsalario
            })

            res.status(200).send({msg: 'numero de salarios mudados: ', resp: resp})

        }).catch((err)=>{
            res.status(404).send({msg: 'erro ao mudar salario', resp: err})
        })
    },
    
    async criarSessaoDoSalario(req, res, app){
        const salarioRecuperadoId = await app.DAO.salarioDAO.consultarSalarioPeloId(app, req.params.idsalario)
        res.send(salarioRecuperadoId)
    }
}