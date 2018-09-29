function TimeController(app) {
    this.app = app;
}

TimeController.prototype.listar = function(callback) {
    var con = this.app.db.MysqlConnection();

    con.connect(function(err) {
        var sql = "SELECT * FROM `team`";
        con.query(sql, function(err, result){
            if(err)
                callback(err)
            else
                callback(null, result)
        })
    })
}
TimeController.prototype.buscarPorId = function(id, callback) {
    var con = this.app.db.MysqlConnection();

    con.connect(function(err) {
        var sql = "SELECT * FROM `team` WHERE id = ?";
        con.query(sql, [id], function(err, result){
            if(err)
                callback(err)
            else
                callback(null, result[0])
        })
    })
}
TimeController.prototype.salvar = function(team, callback) {
    var con = this.app.db.MysqlConnection();

    con.connect(function(err) {
        if(team.id){
            var sql = "UPDATE `team` SET ? WHERE id = ?";
        } else {
            var sql = "INSERT INTO `team` SET ?";
        }
        con.query(sql, [team, team.id], function(err, result){
            callback(err)
        })
    })
}
TimeController.prototype.excluir = function(id, callback) {
    var con = this.app.db.MysqlConnection();

    con.connect(function(err) {
        if(!id){
            callback("Erro ao excluir");
        } else {
            var sql = "DELETE FROM `team` WHERE id = ?";
            con.query(sql, id, function(err, result){
                callback(err, result.affectedRows)
            })
        }
    })
}


module.exports = function() {
    return TimeController;
}