module.exports = {
    async consultarMetas(req, res, app){
        try{
            let resp = await app.DAO.metasDAO.consultarMetaPeloLogin(req.params.idlogin)
            res.status(200).send({msg: "Metas consultadas com sucesso", resp: resp})
        }catch(err){
            res.status(404).send({msg: "Erro ao cadastrar a meta", resp: resp})
        }
    },

    async cadastrarMetas(req, res, app){
        await app.DAO.metasDAO.cadastrarMeta({
            valor: req.body.valor,
            titulo: req.body.titulo,
            texto: req.body.texto,
            status: "p",
            idlogin: req.body.idlogin,
        })
        .then((result)=>{
            res.status(200).send({msg: "Meta cadastrada com sucesso", resp: result})
        })
        .catch((err)=>{
            res.status(404).send({msg: "Erro ao cadastrar a meta", resp: err})
        })
    },

    async modificarMetas(req, res, app){
        let poupancasEmOrdem;
        try{
            poupancasEmOrdem = await app.DAO.poupancaDAO.recuperarPoupancasPeloIdSalarioASC()
            metaRecuperadaPeloId = await app.DAO.metasDAO.consultarMetaPeloIdMeta(req.params.idmeta)
            let conta = [-1*metaRecuperadaPeloId.valor];
            let index;
            for(i=0;i < poupancasEmOrdem.length; i++){
                if(Math.sign(conta[i]) === 1){
                    //conta.push(parseInt(results[i].valor+conta[i]));
                    break;
                }
                conta.push(parseInt(poupancasEmOrdem[i].valor+conta[i]));    
            }
            index = conta.length-2;

            if(conta[conta.length-1] < 0){
                res.status(404).send({msg: "você não tem o valor na poupança necessário", resp: {valorFaltando: conta[conta.length-1]}})
                return
            }
            
            await app.DAO.poupancaDAO.mudarValorPoupancaPeloIdPoupanca({valor: conta[conta.length-1]}, poupancasEmOrdem[index].idpoupanca)
            .then(async (result)=>{
                
                await app.DAO.poupancaDAO.mudarValorMenoresQueIdPoupancaEPeloIdLogin({valor: 0}, poupancasEmOrdem[index].idpoupanca, poupancasEmOrdem[index].idlogin)
                .then(async () => {
                    await app.DAO.metasDAO.mudarMetasPeloIdmeta({status: "c"}, req.params.idmeta)
                    .then(async (result) => res.status(200).send({msg: "Meta mudada com sucesso", resp: result}))
                    .catch(async (err) => res.status(404).send({msg: "Erro ao mudar meta ", resp: err}))
                })
                .catch(() => res.status(404).send({msg: "Erro ao mudar poupancas utilizadas", resp: err}))

            })
            .catch((err) => res.status(404).send({msg: "Erro ao mudar a ultima poupanca", resp: err}))
            
        }catch(err){
            res.status(404).send({msg: "Erro ao mudar meta ", resp: err})
        }
    },

    async deletarMetas(req, res, app){
        try{
            var deleteMeta = await app.DAO.metasDAO.deletarMetasPeloIdMeta(req.params.idmeta) 
            res.status(200).send({msg:'Numero de registros deletados', resp: deleteMeta})
        }catch(err){
            res.status(200).send({msg:'Erro ao deletar registro', resp: err})
        }
    }
}