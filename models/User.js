'use strict';
var dbConn = require('../configs/db');

var User = function (user) {
    this.id = user.id;
    this.username = user.username;
    this.pass = user.pass;
    this.name = user.name;
    this.phone = user.phone;
    this.email = user.email;
    this.role = user.role;
    this.token = user.token;
};

User.addAdmin = function (username, pass, name, result) {
    dbConn.query("INSERT INTO `users`(`username`, `pass`, `name`, `role`) VALUES ('" + username + "','" + pass + "','" + name +  "','admin');", function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
}

User.addAccountTranportation = function (username, pass, id_transportation, result) {
    dbConn.query("INSERT INTO `users`(`username`, `pass`, `role`,`id_transportation`) VALUES ('" + username + "','" + pass + "', 1, '" + id_transportation +  "');", function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
}

User.addUser = function (phone, result) {
    dbConn.query("INSERT INTO `users`(`phone`, `name`, `role`) VALUES ('" + phone + "', '' , 2)", function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
}

User.blockUser = function (phone, result) {
    var sql = "UPDATE `users` SET `blocked`= 1 WHERE phone='" + phone + "'";
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
}

User.deleteUser = function (phone, result) {
    var sql = "DELETE FROM `users` WHERE phone='" + phone + "'";
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

User.getAll = function (result) {
    var sql = "Select * from users";
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res[0]);
    });
};

User.getAllUsers = function (result) {
    var sql = "Select * from users where role=2";
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

User.getNumofUser = function (result) {
    var sql = "Select COUNT(*) as numofuser from users where role = 2";
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

User.getAllTokenUser = function (result) {
    var sql = "Select token from users";
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

User.getUserById = function (id, result) {
    dbConn.query("Select * from users where id=" + id, function (err, res) {
        if (err) result(null, err)
        result(null, res)
    });
}

User.getUserByPhone = function (phone, result) {
    dbConn.query("Select id, phone, name from users where phone='" + phone + "'", function (err, res) {
        if (err) result(null, err)
        var rs = {
            "code": "1000",
            "data": res[0]
        }
        result(null, rs)
    });
}

User.getUserByUsername = function (username, result) {
    dbConn.query("Select * from users where `username`=" +"'"+ username +"'", function (err, res) {
        if (err) result(null, err)
        result(null, res)
    });
}

User.saveToken = function (id, token, result) {
    var sql = "UPDATE `users` SET `token`='" + token + "' WHERE id='" + id + "'";
    dbConn.query(sql)
}

User.unblockUser = function (phone, result) {
    var sql = "UPDATE `users` SET `blocked`= 0 WHERE phone='" + phone + "'";
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
}



module.exports = User