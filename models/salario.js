module.exports = (sequelize, DataTypes) =>{
    var salario = sequelize.define('salario', {
        idsalario: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        valor_fixo: DataTypes.DOUBLE,
        valor_resto: DataTypes.DOUBLE,
        mes: DataTypes.DATE,
        idlogin: {
            type: DataTypes.INTEGER,
        }
    })

    salario.associate = (models)=>{
        salario.belongsTo(models.login, {foreignKey: 'idlogin', onDelete: 'CASCADE', onUpdate: 'CASCADE'})

        salario.hasOne(models.poupanca, {foreignKey: 'idsalario'})
        salario.hasMany(models.salario_descricao, {foreignKey: 'idsalario'})
    }

    return salario
}