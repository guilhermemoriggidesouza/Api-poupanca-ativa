var DbConfig = require('../database.js')
var Sequelize = require('sequelize')

var salario_descricao = DbConfig.define('salario_descricao', {
    idsalario_descricao: { 
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    valor: Sequelize.DOUBLE,
    descricao: Sequelize.STRING,
    idsalario: Sequelize.INTEGER
})

module.exports.salario_descricao = salario_descricao