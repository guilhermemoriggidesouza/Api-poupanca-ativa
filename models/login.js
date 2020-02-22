var DbConfig = require('../database.js')
var Sequelize = require('sequelize')

var login =  DbConfig.define('login', {
    idlogin: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    login: Sequelize.STRING,
    senha: Sequelize.STRING,
    nome: Sequelize.INTEGER
})

module.exports.login = login
