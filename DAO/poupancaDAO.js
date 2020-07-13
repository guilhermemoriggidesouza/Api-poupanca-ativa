const models = require('../models/')
const { Op } = require("sequelize");


module.exports = {

    async criarPoupanca(idSalarioInserido, idlogin){
        const poupanca = {
            valor: 0,
            idsalario: idSalarioInserido,
            idlogin: idlogin
        }
        return await models.poupanca.create(poupanca)
    },

    async consultarPoupancaPeloIdSalario(idSalario){
        return await models.poupanca.findOne({
            where:{
                idsalario: idSalario
            }
        })
    },
    
    async consultarPoupancaPeloIdLogin(idlogin){
        return await models.poupanca.findAll({
            where:{
                idlogin: idlogin
            }
        })
    },

    async mudarValorPoupancaPeloIdSalario(valorModificar, idsalario){
        return await models.poupanca.update(valorModificar, {
            where:{
                idsalario: idsalario
            }
        })
    },

    async recuperarPoupancasPeloIdLogiASC(idlogin){
        return await models.poupanca.findAll({
            where: {
                idlogin : idlogin
            },
            order: [
                ['idpoupanca', 'ASC'],
            ],
        })
    },

    async mudarValorMenoresQueIdPoupancaEPeloIdLogin(valorModificar, idpoupanca, idlogin){
        return await models.poupanca.update(valorModificar, {
            where:{
                [Op.and]: [
                    {
                        idpoupanca: {
                            [Op.lt] : idpoupanca,
                        }
                    },
                    {
                        idlogin: idlogin
                    }
                ]
            },
            limit : 1
        })
    },

    async mudarValorPoupancaPeloIdPoupanca(valorModificar, idpoupanca){
        return await models.poupanca.update(valorModificar, {
            where: {
                idpoupanca: idpoupanca
            }
        })
    }

}