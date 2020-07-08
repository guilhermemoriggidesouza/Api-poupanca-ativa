module.exports = {
    async consultarTodosOsSalariosPeloLogin(req, res, app){
        try{
            var resp = await app.DAO.salarioDAO.consultarSalarioPeloIdLogin(req.params.idlogin)
            res.status(200).send({msg: "salario recuperado com suceso", resp: resp})
        }catch(err){
            res.status(404).send({msg: "erro ao recuperar salarios dos usuarios", resp: err})
        }
    },

    async deletarSalario(req, res, app){
        let recuperarValorBackup
        let deleteSalario
        let salarioRecuperadoPeloIdsalario_vem = await app.DAO.salarioDAO.recuperaSalarioPeloidsalario_vem(req.params.idsalario)

        if(!salarioRecuperadoPeloIdsalario_vem){
            try{
                recuperarValorBackup = await app.DAO.salarioDAO.recuperarValorBackupPeloidsalario_vai(req.params.idsalario)
                await app.DAO.salarioDAO.updateSalario(recuperarValorBackup.idsalario_vem, { valor_resto: recuperarValorBackup.valor})
                    .then(async (resp)=>{
                        deleteSalario = await app.DAO.salarioDAO.deletarSalarioPeloId(req.params.idsalario)
                        res.status(200).send({msg:'Numero de registros deletados', resp: deleteSalario})
                    }).catch((error)=>{
                        res.status(404).send({msg: 'Não foi possível atualizar o salario anterior', resp: error})
                    })
            }catch{
                let errorRecupera = recuperarValorBackup ? '':'Não foi possível encontrar o backup do salario anterior'
                let errorDelete = recuperarValorBackup ? '':'Não foi possível deletar o registro'
                res.status(404).send({msg: `${errorRecupera} ${errorDelete}`})
            }
        }else{
            res.status(404).send({msg:'Salario precisa ser o ultimo feito para ser excluido', resp: salarioRecuperadoPeloIdsalario_vem})
        }
    },

    async cadastrarSalario(req, res, app){
        const today = new Date();
        let msg = ''
        let idSalarioInserido
        let idSalarioAnterior
        let respostaDaRota = {salario:{}, poupanca: {}}
        let valorResto = req.body.valor_resto
        let valorRecuperado = 0.0
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        
        var ultimoSalarioUsuario = await app.DAO.salarioDAO.consultarUltimoSalarioDoUser(req.body.idlogin)

        if(ultimoSalarioUsuario){
            valorResto = req.body.valor_resto + ultimoSalarioUsuario.valor_resto
            await app.DAO.salarioDAO.updateSalario(ultimoSalarioUsuario.idsalario, { valor_resto: 0 })
                .then((salarioMudado)=>{
                    msg = `resgatado ${parseInt(ultimoSalarioUsuario.valor_resto)} de bonus do ultimo salario, `
                    valorRecuperado = ultimoSalarioUsuario.valor_resto
                    idSalarioAnterior = ultimoSalarioUsuario.idsalario
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
        await app.DAO.salarioDAO.inserirSalario(salario)
            .then(async (salarioInserido)=>{
                msg += 'novo salario cadastrado';
                idSalarioInserido = salarioInserido.idsalario
                respostaDaRota.salario = salarioInserido

                await app.DAO.salarioDAO.registrarManipulacaoSalario({
                    valor: req.body.valor_fixo,
                    descricao: 'adicionado novo salario',
                    idsalario: idSalarioInserido
                })
    
                await app.DAO.poupancaDAO.criarPoupanca(idSalarioInserido, req.body.idlogin).then(async (poupancaInserida)=>{
                    msg += ' e poupança criada'
                    respostaDaRota.poupanca = poupancaInserida

                    await app.DAO.salarioDAO.criarNovoBackupDeValor({
                        valor: valorRecuperado,
                        idsalario_vai: idSalarioInserido,
                        idsalario_vem: idSalarioAnterior
                    })
                }).catch((err)=>{
                    console.log(err)
                    res.status(404).send({msg: 'erro ao criar poupança', resp: err})
                })
    
            }).catch((err)=>{
                console.log(err)
                res.status(404).send({msg: 'erro ao cadastrar salario', resp: err})
            })

        res.status(200).send({msg: msg, resp:respostaDaRota})
    },

    async modificarSalario(req, res, app){
        let salarioRecuperadoId = {}
        let newValorResto = 0.0
        let newValorFixo = 0.0
        try{
            salarioRecuperadoId = await app.DAO.salarioDAO.consultarSalarioPeloId(req.params.idsalario)
            newValorResto = parseFloat(salarioRecuperadoId.valor_resto)+ req.body.valorModificar
            newValorFixo = parseFloat(salarioRecuperadoId.valor_fixo) + req.body.valorModificar
        }catch{
            res.status(404).send({msg: "salario não achado", resp: {idsalario: req.params.idsalario}})
        }

        if(newValorFixo < 0 || newValorFixo < 0){
            res.status(404).send({msg: "erro, valor de sobra ou valor fixo menor que zero", resp: {valor_resto: newValorResto, valor_fixo: newValorFixo}})
            return
        }

        let descricao = req.body.valorModificar < 0 ? 'retirado do salario' : 'somado ao salario'

        await app.DAO.salarioDAO.updateSalario(req.params.idsalario, {
            valor_resto: newValorResto,
            valor_fixo: newValorFixo
        }).then(async (resp)=>{

            app.DAO.salarioDAO.registrarManipulacaoSalario({
                valor: req.body.valorModificar,
                descricao: descricao,
                idsalario: req.params.idsalario
            })

            res.status(200).send({msg: 'numero de salarios mudados: ', resp: resp})

        }).catch((err)=>{
            res.status(404).send({msg: 'erro ao mudar salario', resp: err})
        })
    },
    
    async criarSessaoDoSalario(req, res, app){
        try{
            const salarioRecuperadoId = await app.DAO.salarioDAO.consultarSalarioPeloId(req.params.idsalario)
            res.status(200).send(salarioRecuperadoId)
        }catch(err){
            res.status(404).send(salarioRecuperadoId)
        }
    }
}