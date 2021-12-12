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

User.addAdmin = function (username, pass, name, result) {
    dbConn.query("INSERT INTO `users`(`username`, `pass`, `name`, `role`) VALUES ('" + username + "','" + pass + "','" + name +  "','admin');", function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
}

User.getAll = function (result) {
    var sql = "Select * from users";
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(res);
    });
};

User.getUserById = function (id, result) {
    dbConn.query("Select * from users where id=" + id, function (err, res) {
        if (err) result(null, err)
        result(null, res)
    });
}

User.getUserByUsername = function (username, result) {
    dbConn.query("Select * from users where `username`=" +"'"+ username +"'", function (err, res) {
        if (err) result(null, err)
        result(null, res)
    });
}

module.exports = User