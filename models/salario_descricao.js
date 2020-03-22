var DbConfig = require('../database.js')
var Sequelize = require('sequelize')
var salario = require('./salario').salario

var salario_descricao = DbConfig.define('salario_descricao', {
    idsalario_descricao: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    valor: Sequelize.DOUBLE,
    descricao: Sequelize.STRING,
    idsalario: Sequelize.INTEGER
})
salario.hasMany(salario_descricao, {foreignKey: 'idsalario'})
salario_descricao.belongsTo(salario, { foreignKey: 'idsalario', onUpdate: 'CASCADE', onDelete: 'CASCADE'})

module.exports.salario_descricao = salario_descricao