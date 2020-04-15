var express = require('express')
var consign = require('consign')
var bodyParser = require('body-parser')
var app = express()
var sequelizeConfig = require('./database')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());


app.use(function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-types");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})

consign().include("./models").then("./controller").then('./DAO').then('./validator.js').then('./api.js').into(app);

sequelizeConfig.transaction(function(t) {
    var options = { raw: true, transaction: t }

    sequelizeConfig
        .query('SET FOREIGN_KEY_CHECKS = 0', null, options)
        .then(function() {
            sequelizeConfig.sync({force:true})
        })
        .then(function() {
            return sequelizeConfig.query('SET FOREIGN_KEY_CHECKS = 1', null, options)
        })
})

module.exports = app;