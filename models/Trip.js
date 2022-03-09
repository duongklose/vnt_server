'use strict';
var dbConn = require('../configs/db');

var Trip = function (trip) {
    this.id = trip.id;
    this.start_province = trip.start_province;
    this.end_province = trip.end_province;
    this.start_station = trip.start_station;
    this.end_station = trip.end_station;
    this.start_address = trip.start_address;
    this.end_address = trip.end_address;
    this.start_time = trip.start_time;
    this.end_time = trip.end_time;
    this.license_plate = trip.license_plate;
    this.vehicle_type = trip.vehicle_type;
    this.price = trip.price;
};

Trip.addTrip = function (id_coach, price, start_time, end_time, id_start_station, id_end_station, result) {
    var insert = "INSERT INTO `trips`(`id_coach`, `price`, `start_time`, `end_time`, `id_start_location`, `id_end_location`)"
    var value = "VALUES (" + id_coach + "," + price + ",'" + start_time + "','" + end_time + "'," + id_start_station + "," + id_end_station + ")"
    var sql = insert + " " + value;
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

Trip.endTrip = function (id_trip, result) {
    var sql = "UPDATE `trips` SET `state`= 2 WHERE id = " + id_trip;
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

Trip.getAllSeats = function (idTrip, result) {
    var sql = `SELECT seats.id, seats.alias as name,
                    CASE
                        WHEN seats.id in (SELECT seats.id FROM seats, tickets WHERE seats.id = tickets.id_seat AND tickets.id_trip = ${idTrip}) THEN 2
                        ELSE seats.state
                    END as state, seats.floor 
                FROM seats, coaches, trips
                WHERE seats.id_coach_type = coaches.type AND trips.id_coach = coaches.id AND trips.id = ${idTrip}`
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

Trip.getDetailMergeTrip = function (id, result) {
    var select_from_1 = "SELECT trips.id, coach_type.num_of_seats as max FROM trips, coaches, coach_type"
    var where_1 = "WHERE trips.id_coach=coaches.id AND coaches.type = coach_type.id AND trips.id = " + id;
    var general_trip = select_from_1 + " " + where_1;

    var select_from_2 = "SELECT trips.id, COUNT(*) as num from tickets, seats, trips"
    var where_2 = "WHERE tickets.id_seat=seats.id AND seats.area = 1 AND tickets.id_trip=trips.id AND trips.id = " + id;
    var front_seats = select_from_2 + " " + where_2;

    var select_from_3 = "SELECT trips.id, COUNT(*) as num from tickets, seats, trips"
    var where_3 = "WHERE tickets.id_seat=seats.id AND seats.area = 1 AND tickets.id_trip=trips.id AND trips.id = " + id;
    var back_seats = select_from_3 + " " + where_3;

    var select = "SELECT general_trip.id, front_seats.num as num_front_seats, back_seats.num  as num_back_seats, general_trip.max"
    var from = "FROM" + " (" + general_trip + ") as general_trip, (" + front_seats + ") as front_seats, (" + back_seats + ") as back_seats"
    var where = "WHERE general_trip.id=front_seats.id AND general_trip.id=back_seats.id"

    var sql = select + " " + from + " " + where

    dbConn.query(sql, function (err, res) {
        if (err) {
            result(err);
        }
        result(res);
    });
};

Trip.getDetailMergeTrips = function (ids, result) {
    var select_from_1 = "SELECT trips.id as id, coach_type.num_of_seats as max FROM trips, coaches, coach_type"
    var where_1 = "WHERE trips.id_coach=coaches.id AND coaches.type = coach_type.id AND trips.id IN (" + ids + ")";
    var general_trip = select_from_1 + " " + where_1;

    var front_seats = `SELECT trips.id as id, SUM(CASE WHEN seats.area = 1 THEN 1 ELSE 0 END) as num FROM trips 
                    LEFT JOIN tickets ON trips.id = tickets.id_trip 
                    LEFT JOIN seats ON tickets.id_seat = seats.id  
                    WHERE trips.id IN (${ids})   
                    GROUP BY trips.id`

    var back_seats = `SELECT trips.id as id, SUM(CASE WHEN seats.area = 2 THEN 1 ELSE 0 END) as num FROM trips 
                    LEFT JOIN tickets ON trips.id = tickets.id_trip 
                    LEFT JOIN seats ON tickets.id_seat = seats.id  
                    WHERE trips.id IN (${ids})   
                    GROUP BY trips.id`

    var select = "SELECT general_trip.id, front_seats.num as num_front_seats, back_seats.num  as num_back_seats, general_trip.max"
    var from = "FROM" + " (" + general_trip + ") as general_trip, (" + front_seats + ") as front_seats, (" + back_seats + ") as back_seats"
    var where = "WHERE general_trip.id=front_seats.id AND general_trip.id=back_seats.id"
    var order_by = "ORDER BY general_trip.max DESC, front_seats.num DESC"

    var sql = select + " " + from + " " + where + " " + order_by
    dbConn.query(sql, function (err, res) {
        if (err) {
            result(err);
        }
        result(res);
    });
};


Trip.getDoneTrips = function (id, result) {
    var select = "SELECT trips.id as id, p1.name as start_province, p2.name as end_province, s1.name as start_station, s2.name as end_station, s1.address as start_address, s2.address as end_address, trips.start_time, trips.end_time, coaches.license_plate, coach_type.name as vehicle_type, trips.price";
    var from = " FROM trips, coaches, coach_type, stations as s1, stations as s2, provinces as p1, provinces as p2";
    var where = " WHERE trips.id_start_location = s1.id AND trips.id_end_location = s2.id AND s1.id_province = p1.id AND s2.id_province = p2.id AND  trips.id_coach = coaches.id AND coaches.type = coach_type.id AND trips.state = 2 AND coaches.id_transportation = " + id;
    var sql = select + from + where;
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

Trip.getFreeSeats = function (id, result) {
    var sql = `SELECT list_seats.id
    FROM (SELECT seats.id FROM seats, tickets, trips, coaches 
    WHERE tickets.id_trip = trips.id AND trips.id_coach = coaches.id AND coaches.type = seats.id_coach_type AND trips.id = ${id} AND seats.state != 0
    GROUP BY seats.id) as list_seats
    LEFT JOIN (SELECT tickets.id_seat FROM tickets, trips, seats WHERE tickets.id_trip = trips.id AND tickets.id_seat = seats.id AND tickets.id_trip = ${id}) as booked_seats
    ON booked_seats.id_seat = list_seats.id 
    WHERE booked_seats.id_seat IS NULL`
    dbConn.query(sql, function (err, res) {
        if (err)
            result(err);
        result(res);
    });
};

Trip.getTripByID = function (id, result) {
    var select = "SELECT trips.id as id, p1.name as start_province, p2.name as end_province, s1.name as start_station, s2.name as end_station, s1.address as start_address, s2.address as end_address, trips.start_time, trips.end_time, coaches.license_plate, coach_type.name as vehicle_type, trips.price , booked_tickets.num";
    var from = "FROM trips, coaches, coach_type, stations as s1, stations as s2, provinces as p1, provinces as p2, (SELECT trips.id, COUNT(*) AS num FROM tickets, trips WHERE trips.id = tickets.id_trip AND tickets.id_trip = " + id + ") as booked_tickets ";
    var where = "WHERE trips.id_start_location = s1.id AND trips.id_end_location = s2.id AND s1.id_province = p1.id AND s2.id_province = p2.id AND  trips.id_coach = coaches.id AND coaches.type = coach_type.id AND trips.state = 0 AND booked_tickets.id = trips.id AND trips.id = " + id;
    var sql = select + " " + from + " " + where;
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

Trip.getTrips = function (id, result) {
    var sql = `SELECT trips.id as id, p1.name as start_province, p2.name as end_province, s1.name as start_station, s2.name as end_station, s1.address as start_address, s2.address as end_address, trips.start_time, trips.end_time, coaches.license_plate, coach_type.name as vehicle_type, trips.price, s.num as booked_ticket, general_trip.max, trips.state
                FROM trips, coaches, coach_type, stations as s1, stations as s2, provinces as p1, provinces as p2, 
                    (SELECT trips.id as id, coach_type.num_of_seats as max 
                    FROM trips, coaches, coach_type 
                    WHERE trips.id_coach=coaches.id AND coaches.type = coach_type.id AND coaches.id_transportation=${id}) as general_trip, 
                    (SELECT trips.id as id, SUM(CASE WHEN seats.area != 0 THEN 1 ELSE 0 END) as num 
                    FROM trips
                    LEFT JOIN tickets ON trips.id = tickets.id_trip 
                    LEFT JOIN seats ON tickets.id_seat = seats.id
                    JOIN coaches ON trips.id_coach = coaches.id
                    WHERE coaches.id_transportation=${id}
                    GROUP BY trips.id) as s
                WHERE general_trip.id=s.id AND general_trip.id=trips.id AND trips.id_start_location = s1.id AND trips.id_end_location = s2.id AND s1.id_province = p1.id AND s2.id_province = p2.id AND  trips.id_coach = coaches.id AND coaches.type = coach_type.id AND trips.state = 0 AND coaches.id_transportation = ${id}
                ORDER BY trips.start_time ASC`
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

Trip.searchTrips = function (idStartProvince, idEndProvince, time, result) {
    var sql = `SELECT trips.id, transportations.logo, transportations.name, transportations.rate_point, coach_type.name as typename, trips.price, trips.start_time, trips.end_time, s1.name as start_station, s2.name as end_station
                FROM trips, stations as s1, stations as s2, provinces as p1, provinces as p2, coaches, transportations, coach_type
                WHERE trips.id_start_location = s1.id AND s1.id_province = p1.id AND trips.id_end_location = s2.id AND s2.id_province = p2.id AND trips.id_coach = coaches.id AND coaches.id_transportation = transportations.id AND coaches.type = coach_type.id AND p1.id = ${idStartProvince} AND p2.id = ${idEndProvince} AND trips.start_time LIKE '${time}%'
                ORDER BY trips.start_time ASC`
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);

        var r = {
            "code": "201",
            "data": res
        }
        result(null, r);
    });
};

Trip.startTrip = function (id_trip, result) {
    var sql = "UPDATE `trips` SET `state`= 1 WHERE id = " + id_trip;
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

Trip.stopTrip = function (id_trip, result) {
    var sql = "UPDATE `trips` SET `state`= 3 WHERE id = " + id_trip;
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

module.exports = Trip