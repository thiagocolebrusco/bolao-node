function MysqlConnection() {
    var mysql = require("mysql")
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "bolao_node"
    });
    return con;
}

module.exports = function() {
    return MysqlConnection;
} 