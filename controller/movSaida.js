module.exports = {
    async consultarMovSaida(req, res, app){
        res.send('consultar todos os salarios')
    },

    async cadastrarMovSaida(req, res, app){
        res.send('cadastrar salario')
    },

    async deletarMovSaida(req, res, app){
        res.send('deletar salario')
    },

    async modificarSalario(req, res, app){
        res.send('modificar salario')
    },
    
    async modificarMovSaida(req, res, app){
        res.send('criar sessao do salario')
    }
}