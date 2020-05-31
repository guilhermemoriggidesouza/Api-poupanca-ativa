module.exports = {
    async consultarMetas(req, res, app){
        res.send('consultar todos os salarios')
    },

    async cadastrarMetas(req, res, app){
        res.send('cadastrar salario')
    },

    async modificarMetas(req, res, app){
        connection.query('SELECT * FROM poupanca ORDER BY idpoupanca ASC', function(error, results, fields){
            if(error){
                res.status(404).send(error);
                console.log(error);
            }else{
                let conta = [-1*dadosBody.valor];
                let index;
                for(i=0;i < results.length; i++){
                    if(Math.sign(conta[i]) === 1){
                        //conta.push(parseInt(results[i].valor+conta[i]));
                        break;
                    }
                    conta.push(parseInt(results[i].valor+conta[i]));              
                }
                index = conta.length-2;
                connection.query('UPDATE poupanca SET valor = '+conta[conta.length-1]+' WHERE idpoupanca = '+results[index].idpoupanca+' LIMIT 1', function(error2, results2, fields){
                    if(error2){
                        res.status(404).send(error2);
                        console.log(error2);
                    }else{
                        connection.query('UPDATE poupanca SET valor = 0 WHERE idpoupanca < '+results[index].idpoupanca, function(error3, results3, fields){
                            if(error3){
                                res.status(404).send(error3);
                                console.log(error3);
                            }else{
                                console.log(results3);
                                QueryExecuta(dadosBody.sql, req, res);
                            }
                        })
                    };
                })
            }
        })
    },

    async deletarMetas(req, res, app){
        res.send('modificar salario')
    }
}