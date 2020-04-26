module.exports = (sequelize, DataTypes) =>{
    var metas = sequelize.define('metas', {
        idmeta: { 
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        valor: DataTypes.DOUBLE,
        titulo: DataTypes.STRING,
        texto: DataTypes.STRING,
        status: DataTypes.CHAR,
        idlogin: DataTypes.INTEGER
    })
    
    return metas
}