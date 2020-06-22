module.exports = (sequelize, DataTypes)=>{
    var mov_saida = sequelize.define('mov_saida', {
        idmov_saida: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        valor: DataTypes.DOUBLE,
        titulo: DataTypes.STRING,
        texto: DataTypes.STRING,
        status: DataTypes.CHAR,
        idsalario: DataTypes.INTEGER
    })

    return mov_saida
}