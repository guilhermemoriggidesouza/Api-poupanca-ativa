var express = require('express')
var consign = require('consign')
var bodyParser = require('body-parser')
var app = express()
var db = require('./models/index')
var cors = require('cors');


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());

consign().then("./controller").then('./DAO').then('./validator.js').then('./api.js').into(app);

db.sequelize.authenticate().then(()=>{
    console.log('conectou')
    db.sequelize.sync({force:true}).then(()=>{
        console.log('ligou o corno')
    })
})

module.exports = app;