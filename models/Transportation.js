'use strict';
var dbConn = require('../configs/db');

var Transportation = function (transportation) {
    this.id = transportation.id;
    this.name = transportation.name;
    this.description = transportation.description;
    this.phone = transportation.phone;
    this.rate_point = transportation.rate_point;
};

Transportation.addTransportation = function (name, phone, description, result) {
    var sql = "INSERT INTO `transportations`(`name`, `description`, `phone`) VALUES ('" + name + "','" + description + "','"+ phone +"')";
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

Transportation.deleteTransportation = function (phone, result) {
    var sql = "DELETE FROM `transportations` WHERE phone='" + phone + "'";
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

Transportation.getNumOfTransportation = function (result) {
    var sql = "Select COUNT(*) as numoftransportation from transportations ";
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

Transportation.getAllTransportations = function (result) {
    var sql = "Select * from transportations ";
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

Transportation.getTransportationByPhone = function (phone, result) {
    var sql = "Select * from transportations where phone='" + phone + "'";
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

Transportation.getTransportationByID = function (id, result) {
    var sql = "Select * from transportations where id=" + id;
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};


module.exports = Transportation