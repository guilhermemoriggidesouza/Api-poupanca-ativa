var app = require('./server.js')
var porta = process.env.PORT || 8080;

app.listen(porta, function(){
    console.log('Del Rey ligado')
})