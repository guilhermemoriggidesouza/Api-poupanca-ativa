var DbConfig = require('../database.js')
var Sequelize = require('sequelize')

var poupanca = DbConfig.define('poupanca', {
    idpoupanca: { 
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    valor: Sequelize.DOUBLE,
    idsalario: Sequelize.INTEGER
})

module.exports.poupanca = poupanca