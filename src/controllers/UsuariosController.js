function UsuariosController(app) {
    this.app = app;
}

UsuariosController.prototype.listar = function(callback) {
    var con = this.app.db.MysqlConnection();
    
    con.connect(function(err) {
        var sql = "SELECT * FROM `user`";
        con.query(sql, function(err, result){
            if(err)
                callback(err);
            else{
                callback(null, result);
            }
        })
    }); 
}

UsuariosController.prototype.salvar = function(user, callback) {
    var con = this.app.db.MysqlConnection();

    con.connect(function(err) {
        if(user.id){
            var sql = 'UPDATE `user` SET ? WHERE id = ?';
        } else {
            var sql = "INSERT INTO `user` SET ?";
        }
        con.query(sql, [user, user.id], function(err){
            callback(err)               
        })
    });
}

UsuariosController.prototype.buscarPorId = function(id, callback) {
    if(!id) {
        callback("Parâmetro inválido");
    } else {
        var con = this.app.db.MysqlConnection();

        con.connect(function(err) {
            var sql = 'SELECT id, name, username, password FROM user WHERE id = ?';
            con.query(sql, [ id ], function(err, result){
                if(err)
                    callback(err);
                else{
                    callback(null, result[0]);
                }
            })
        });
    }
}

UsuariosController.prototype.excluir = function(id, callback) {
    if(!id) {
        callback("Parâmetro inválido");
    } else {
        var con = this.app.db.MysqlConnection();

        con.connect(function(err) {
            var sql = 'DELETE FROM user WHERE id = ?';
            con.query(sql, [ id ], function(err, result){
                callback(err, result.affectedRows);
            })
        });
    }
}

UsuariosController.prototype.login = function(user, callback) {
    if(!user || !user.username || !user.password) {
        callback("Parâmetros inválidos");
    } else {
        var con = this.app.db.MysqlConnection();

        con.connect(function(err) {
            var sql = 'SELECT * FROM user WHERE username = ? AND password = ?';
            con.query(sql, [ user.username, user.password ], function(err, result){
                if(err)
                    callback(err);
                else if(!result) {
                    callback("Usuário ou senha inválidos");
                } else {
                    callback(null, result[0]);
                }
            })
        });
    }
}

module.exports = function() {
    return UsuariosController;
}