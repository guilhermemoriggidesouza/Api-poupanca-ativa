var DbConfig = require('../database.js')
var Sequelize = require('sequelize')
var login = require('./login').login

var salario = DbConfig.define('salario', {
    idsalario: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    valor_fixo: Sequelize.DOUBLE,
    valor_resto: Sequelize.DOUBLE,
    mes: Sequelize.DATE,
    idlogin: Sequelize.INTEGER
})
salario.belongsTo(login, { foreignKey: 'idlogin', onUpdate: 'CASCADE', onDelete: 'CASCADE',})

module.exports.salario = salario