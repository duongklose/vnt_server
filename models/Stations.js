'use strict';
var dbConn = require('../configs/db');

var Station = function (station) {
    this.id = station.id;
    this.province = station.province;
    this.address = station.address;
    this.name = station.name;
};

Station.getAllProvince = function (result) {
    var sql = "SELECT * FROM `provinces`";
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

Station.getStations = function (id_province, result) {
    var sql = "SELECT id, address, name FROM `stations` WHERE id_province=" + id_province;
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};




module.exports = Station