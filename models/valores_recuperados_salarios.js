module.exports = (sequelize, DataTypes)=>{
    var valores_recuperados_salarios = sequelize.define('valores_recuperados_salarios', {
        idvalores_recuperados: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        valor: DataTypes.DOUBLE,
        idsalario_vai: DataTypes.INTEGER,
        idsalario_vem: DataTypes.INTEGER
    })
    valores_recuperados_salarios.associate = (models)=>{
        valores_recuperados_salarios.belongsTo(models.salario, { foreignKey: 'idsalario_vai', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
        valores_recuperados_salarios.belongsTo(models.salario, { foreignKey: 'idsalario_vem', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    }

    return valores_recuperados_salarios
}