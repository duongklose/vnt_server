'use strict';
var dbConn = require('../configs/db');

var MergeTrip = function (trip) {
    this.id = trip.id;
    this.tickets = trip.tickets;
    this.max = trip.max;
};

module.exports = MergeTrip