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

Ticket.moveTicketToAnotherTrip = function (id_ticket, id_trip, id_seat, result) {
    var sql = "UPDATE tickets SET id_trip = " + id_trip + ", id_seat = " + id_seat + " WHERE id = " + id_ticket;
    dbConn.query(sql, function (err, res) {
        if (err)
            result(err);
        result(res);
    });
};

Ticket.getUsersBookTrip = function (id_trip, result) {
    var sql = "SELECT id_user FROM `tickets` WHERE id_trip = " + id_trip;
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

Ticket.getTickets = function (id_trip, result) {
    var sql = "SELECT * FROM `tickets` WHERE id_trip = " + id_trip + " ORDER BY book_date DESC";
    dbConn.query(sql, function (err, res) {
        if (err)
            result(err);
        result(res);
    });
};

Ticket.getDetailTickets = function (id_trip, result) {
    var sql = `SELECT tickets.id, users.phone, tickets.departure_location, tickets.arrival_location, seats.alias
                FROM tickets, users, seats
                WHERE tickets.id_user = users.id AND tickets.id_seat = seats.id  AND tickets.id_trip = ${id_trip}`;
    console.log("sql", sql)
                dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

module.exports = Ticket