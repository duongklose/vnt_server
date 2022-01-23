'use strict';
var dbConn = require('../configs/db');

var Review = function (review) {
    this.id = review.id;
    this.start_province = review.start_province;
    this.end_province = review.end_province;
    this.start_station = review.start_station;
    this.end_station = review.end_station;
};

Review.deleteTransportationComment = function (id, result) {
    var sql = "UPDATE `reviews` SET `return_comment`= '' WHERE id = " + id;
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

Review.getReviews = function (id_transportation, result) {
    var sql = "SELECT reviews.id, users.name, reviews.comment, reviews.return_comment, reviews.point FROM `reviews`, `users` WHERE users.id = reviews.id_user AND reviews.id_transportation = " + id_transportation;
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

Review.returnComment = function (id, comment, result) {
    var sql = "UPDATE `reviews` SET `return_comment`= '" + comment + "' WHERE id = " + id;
    dbConn.query(sql, function (err, res) {
        if (err)
            result(null, err);
        result(null, res);
    });
};

module.exports = Review