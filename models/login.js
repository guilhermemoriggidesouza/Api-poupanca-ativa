module.exports = (sequelize, DataTypes)=>{
    var login =  sequelize.define('login', {
        idlogin: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        login: {
            type : DataTypes.STRING,
            unique: true
        },
        senha: {
            type : DataTypes.STRING,
        },
        nome: DataTypes.STRING
    })

    login.associate = (models)=>{
        login.hasMany(models.salario, {foreignKey: 'idlogin'})
        login.hasMany(models.poupanca, {foreignKey: 'idlogin'})
        login.hasMany(models.metas, {foreignKey: 'idlogin'})
    }
    
    return login
}
