'use strict';
var dbConn = require('../configs/db');

var Notification = function (noti) {
    this.id = noti.id;
    this.start_province = noti.start_province;
    this.end_province = noti.end_province;
    this.start_station = noti.start_station;
    this.end_station = noti.end_station;
    this.start_address = noti.start_address;
};


Notification.addNotification = function (id_user_from, id_user_to, title, content) {
    var insert = "INSERT INTO `notifications`(`id_user_from`, `id_user_to`, `title`, `content`)"
    var value = "VALUES (" + id_user_from + "," + id_user_to + ",'" + title + "','" + content + "')"
    var sql = insert + " " + value;
    // dbConn.query(sql, function (err, res) {
    //     if (err)
    //         result(null, err);
    //     result(null, res);
    // });
    dbConn.query(sql);
};

module.exports = Notification