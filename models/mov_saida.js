var DbConfig = require('../database.js')
var Sequelize = require('sequelize')

var mov_saida = DbConfig.define('mov_saida', {
    idmov_saida: { 
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    valor: Sequelize.DOUBLE,
    titulo: Sequelize.STRING,
    texto: Sequelize.STRING,
    status: Sequelize.CHAR,
    idsalario: Sequelize.INTEGER
})

module.exports.mov_saida = mov_saida