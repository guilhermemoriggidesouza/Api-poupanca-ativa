module.exports = (sequelize, DataTypes) =>{
    var metas = sequelize.define('metas', {
        idmeta: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        valor: DataTypes.DOUBLE,
        titulo: DataTypes.STRING,
        texto: DataTypes.STRING,
        status: DataTypes.CHAR,
        idlogin: DataTypes.INTEGER
    })

    metas.associate = (models)=>{
        metas.belongsTo(models.login, {foreignKey: 'idlogin', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    }
    
    return metas
}