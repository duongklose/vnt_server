'use strict';
var dbConn = require('../configs/db');

var Transportation = function (transportation) {
    this.id = transportation.id;
    this.name = transportation.name;
    this.description = transportation.description;
    this.phone = transportation.phone;
    this.rate_point = transportation.rate_point;
};

Transportation.getNumOfTransportation = function (result) {
    var sql = "Select COUNT(*) as numoftransportation from transportations ";
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};




module.exports = Transportation