module.exports = (sequelize, DataTypes)=>{
    var poupanca = sequelize.define('poupanca', {
        idpoupanca: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        valor: DataTypes.DOUBLE,
        idsalario: DataTypes.INTEGER
    })
    
    poupanca.associate = (models) =>{
        poupanca.belongsTo(models.salario, { foreignKey: 'idsalario', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    }
    
    return poupanca
}