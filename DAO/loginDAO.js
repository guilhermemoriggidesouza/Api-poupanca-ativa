module.exports = {
    async consultarLoginPeloEmail(app, email){
       return await app.models.login.findOne({
            where: {
                login: email,
            },
        })
    },

    async inserirLogin(app, registro){
        return await app.models.login.create(registro)
    },

    async mudarSenhaPeloEmail(app, email, senha){
        return await app.models.login.update({senha: senha}, {
            where: {
                login: email
            }
        })
    }
}