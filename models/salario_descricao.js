module.exports = (sequelize, DataTypes)=>{
    var salario_descricao = sequelize.define('salario_descricao', {
        idsalario_descricao: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        valor: DataTypes.DOUBLE,
        descricao: DataTypes.STRING,
        idsalario: DataTypes.INTEGER
    })
    salario_descricao.associate = (models)=>{
        salario_descricao.belongsTo(models.salario, { foreignKey: 'idsalario', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    }

    return salario_descricao
}