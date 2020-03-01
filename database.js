const Sequelize = require('sequelize');

const sequelize = new Sequelize('opa', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
    .authenticate()
    .then(() => console.log('Authenticated'))
    .catch(() => console.log('Error Auth'));

sequelize.sync()

module.exports = sequelize