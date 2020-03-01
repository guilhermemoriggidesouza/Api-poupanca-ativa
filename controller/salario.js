module.exports = {
    async consultarTodosOsSalarios(req, res, app){
        res.send('consultar todos os salarios')
    },

    async cadastrarSalario(req, res, app){
        res.send('cadastrar salario')
    },
    async modificarSalario(req, res, app){
        res.send('modificar salario')
    },
    
    async criarSessaoDoSalario(req, res, app){
        res.send('criar sessao do salario')
    }
}