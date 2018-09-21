module.exports = function(app) {

    app.get("/", (req, res) => {
        res.render("home/index")
    });
    
    app.get("/usuarios", (req, res) => {

        var mysql = require("mysql")
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "bolao_node"
        });

        con.connect(function(err) {
            console.log("Connected!");
            
            
            var sql = "SELECT * FROM `user`";
            con.query(sql, function(err, result){
                if(err)
                    res.render('usuarios/lista', {user: user, message: err.message});
                else{
                    var list = result;
                    res.render("usuarios/lista", { list })
                }
            })
        }); 
    });
    app.get("/usuarios/cadastro", (req, res) => { 
        
        res.render("usuarios/cadastro", { user: {}})
    });
    app.post("/usuarios/cadastro", (req, res) => { 
        var user = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        }

        var mysql = require("mysql")
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "bolao_node"
        });

        con.connect(function(err) {
            console.log("Connected!");
            
            
            var sql = "INSERT INTO `user` SET ?";
            con.query(sql, user, function(err, result){
                if(err)
                    res.render('usuarios/cadastro', {user: user, message: err.message});
                else
                    res.render('usuarios/cadastro', {user: {}, message: "Salvo com sucesso"});
            })
        });
    });

}