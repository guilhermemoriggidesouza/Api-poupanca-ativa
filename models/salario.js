var DbConfig = require('../database.js')
var Sequelize = require('sequelize')

var salario = DbConfig.define('salario', {
    idsalario: { 
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    valor_fixo: Sequelize.DOUBLE,
    valor_resto: Sequelize.DOUBLE,
    mes: Sequelize.DATE,
    idlogin: Sequelize.INTEGER
})

module.exports.salario = salario