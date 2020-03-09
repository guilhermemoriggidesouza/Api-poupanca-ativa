var DbConfig = require('../database.js')
var Sequelize = require('sequelize')
var salario = require('./salario').salario

var poupanca = DbConfig.define('poupanca', {
    idpoupanca: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    valor: Sequelize.DOUBLE,
    idsalario: Sequelize.INTEGER
})
poupanca.belongsTo(salario, { foreignKey: 'idsalario'})

module.exports.poupanca = poupanca