const models = require('../models/') 

module.exports = {
    async consultarLoginPeloEmail(email){
       return await models.login.findOne({
            where: {
                login: email,
            },
        })
    },

    async inserirLogin(registro){
        return await models.login.create(registro)
    },

    async mudarSenhaPeloEmail(email, senha){
        return await models.login.update({senha: senha}, {
            where: {
                login: email
            }
        })
    }
}