const hex = require('amrhextotext')

module.exports = {
    async insertDados(req, res, app){
        const today = new Date();
        let idSalarioInserido
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var resp = {
            poupanca:{},
            login:{},
            salario:{}
        }
        const registroLogin = {
            login: 'guilherme@moriggi.com',
            senha: hex.textToHex('123'),
            nome: 'guilherme'
        }
        
        await app.DAO.loginDAO.inserirLogin(app, registroLogin).then(async (loginInserido)=>{
            
            resp.login = loginInserido
            const salario = {
                valor_fixo: 100,
                valor_resto: 100,
                mes: date,
                idlogin: loginInserido.idlogin
            }

            await app.DAO.salarioDAO.inserirSalario(app, salario)
                .then(async (salarioInserido)=>{
                    idSalarioInserido = salarioInserido.idsalario
                    resp.salario = salarioInserido
        
                    await app.DAO.poupancaDAO.criarPoupanca(app, idSalarioInserido).then((poupancaInserida)=>{
                        resp.poupanca = poupancaInserida
                    }).catch((err)=>{
                        res.status(404).send({msg: 'erro ao criar poupança', resp: err})
                    })
        
                }).catch((err)=>{
                    res.status(404).send({msg: 'erro ao cadastrar salario', resp: err})
                })
    
        }).catch((err)=>{
            res.status(404).send({msg: 'erro ao cadastrar login', resp: err})
        })
        res.status(200).send(resp)
    }
}