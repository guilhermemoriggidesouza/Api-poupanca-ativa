module.exports = {
    async consultarLoginPeloEmail(app, email){
       return app.models.login.login.find({
            where: {
                email: email,
            },
        })
    },
    async inserirLogin(app, registro){
        return await app.models.login.login.create(registro)
    }
}