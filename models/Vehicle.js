'use strict';
var dbConn = require('../configs/db');

var Vehicle = function (vehicle) {
    this.id = vehicle.id;
    this.id_transportation = vehicle.id_transportation;
    this.license_plate = vehicle.license_plate;
    this.phone = vehicle.phone;
    this.type = vehicle.type;
};

Vehicle.addVehicle = function (license_plate, phone, type, id_transportation, result) {
    var sql = "INSERT INTO `coaches`(`id_transportation`, `license_plate`, `type`, `phone`) VALUES (" + id_transportation + ",'" + license_plate + "'," + type + ",'" + phone +"')";
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

Vehicle.deleteVehicle = function (phone, result) {
    var sql = "DELETE FROM `coaches` WHERE phone=" + phone;
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

Vehicle.getAllVehicleType = function (result) {
    var sql = "SELECT * FROM `coach_type`";
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

Vehicle.getTransportationVehicles = function (id, result) {
    var sql = "SELECT coaches.id, coach_type.name as type, coaches.license_plate, coaches.phone FROM `coaches`, `coach_type` WHERE `coach_type`.id = `coaches`.type AND `coaches`.id_transportation= '" + id + "'";
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

Vehicle.getVehicleByLicensePlate = function (license_plate, result) {
    var sql = "SELECT * FROM `coaches` WHERE `license_plate`= '" + license_plate + "'";
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

Vehicle.getVehicleByPhone = function (phone, result) {
    var sql = "SELECT * FROM `coaches` WHERE `phone`= '" + phone + "'";
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

Vehicle.getVehicleType = function (name, result) {
    var sql = "SELECT `id` FROM `coach_type` WHERE `name`= '" + name + "'";
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};




module.exports = Vehicle