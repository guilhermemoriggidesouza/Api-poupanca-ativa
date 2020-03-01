module.exports = {
    async consultarLoginPeloEmail(app, email){
       return await app.models.login.login.findOne({
            where: {
                login: email,
            },
        })
    },
    async inserirLogin(app, registro){
        return await app.models.login.login.create(registro)
    }
}