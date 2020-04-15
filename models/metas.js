var DbConfig = require('../database.js')
var Sequelize = require('sequelize')
module.exports = ()=>{
    var metas = DbConfig.define('metas', {
        idmeta: { 
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        valor: Sequelize.DOUBLE,
        titulo: Sequelize.STRING,
        texto: Sequelize.STRING,
        status: Sequelize.CHAR,
        idlogin: Sequelize.INTEGER
    })
    
    return metas
}