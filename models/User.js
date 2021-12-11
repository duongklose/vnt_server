'use strict';
var dbConn = require('./../config/db');

var User = function (user) {
    this.id = user.id;
    this.username = user.username;
    this.pass = user.pass;
    this.name = user.name;
    this.phone = user.phone;
    this.email = user.email;
    this.role = user.role;
};

User.getAll = function (result) {
    var sql = "Select * from users";
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

User.getUserById = function (id, result) {
    dbConn.query("Select * from users where id=" + id, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
}

module.exports = User