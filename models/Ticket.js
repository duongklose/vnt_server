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

Ticket.addTicket = function (idTrip, idUser, idSeat, bookDate, departureLocation, arrivalLocation, result) {
    var sql = `INSERT INTO tickets (id_trip, id_user, id_seat, book_date, state, departure_location, arrival_location) 
                VALUES (${idTrip} , ${idUser} , ${idSeat} , '${bookDate}' , 0, '${departureLocation}' , '${arrivalLocation}')`;
    console.log("sql", sql)
                dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        var r = {
            "code": "1000",
            "data": 1
        }
        result(null, r);
    });
};

Ticket.deleteTicket = function (id, result) {
    var sql = `DELETE FROM tickets WHERE id= ${id}`;
        dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        var r = {
            "code": "1000",
            "data": 1
        }
        result(null, r);
    });
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
                WHERE tickets.id_user = users.id AND tickets.id_seat = seats.id  AND tickets.id_trip = ${id_trip}
                ORDER BY seats.id ASC`;
    console.log("sql", sql)
                dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

Ticket.getMyTicket = function (id, result) {
    var sql = `SELECT tickets.id, transportations.name, coaches.license_plate, tickets.book_date, tickets.departure_location as startLocation, tickets.arrival_location as endLocation, trips.start_time, trips.end_time, trips.price, seats.alias as seat 
                FROM tickets, trips, coaches, transportations, seats
                WHERE tickets.id_trip = trips.id AND trips.id_coach = coaches.id AND coaches.id_transportation = transportations.id AND tickets.id_seat = seats.id AND trips.state = 0 AND tickets.id_user = ${id}`;
        dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        var r = {
            "code": "1000",
            "data": res
        }
        result(null, r);
    });
};

Ticket.getOldTicket = function (id, result) {
    var sql = `SELECT tickets.id, transportations.name, coaches.license_plate, tickets.book_date, tickets.departure_location as startLocation, tickets.arrival_location as endLocation, trips.start_time, trips.end_time, trips.price, seats.alias as seat 
                FROM tickets, trips, coaches, transportations, seats
                WHERE tickets.id_trip = trips.id AND trips.id_coach = coaches.id AND coaches.id_transportation = transportations.id AND tickets.id_seat = seats.id AND trips.state = 2 AND tickets.id_user = ${id}`;
        dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        var r = {
            "code": "1000",
            "data": res
        }
        result(null, r);
    });
};

module.exports = Ticket