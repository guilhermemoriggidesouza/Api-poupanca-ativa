var DbConfig = require('../database.js')
var Sequelize = require('sequelize')

var login =  DbConfig.define('login', {
    idlogin: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    login: {
        type : Sequelize.STRING,
        unique: true
    },
    senha: {
        type : Sequelize.STRING,
    },
    nome: Sequelize.STRING
})

module.exports.login = login
