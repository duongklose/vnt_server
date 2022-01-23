'use strict';
var dbConn = require('../configs/db');

var Ticket = function (ticket) {
    this.id = ticket.id;
    this.id_trip = ticket.id_trip;
    this.id_user = ticket.id_user;
    this.id_seat = ticket.id_seat;
    this.book_date = ticket.book_date;
    this.state = ticket.state;
    this.departure_location = ticket.departure_location;
    this.arrival_location = ticket.arrival_location;
};

Ticket.getUsersBookTrip = function (id_trip, result) {
    var sql = "SELECT id_user FROM `tickets` WHERE id_trip = " + id_trip;
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

module.exports = Ticket