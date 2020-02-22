module.exports = {
    async consultarMetas(req, res, app){
        res.send('consultar todos os salarios')
    },

    async cadastrarMetas(req, res, app){
        res.send('cadastrar salario')
    },

    async modificarMetas(req, res, app){
        res.send('deletar salario')
    },

    async deletarMetas(req, res, app){
        res.send('modificar salario')
    }
}