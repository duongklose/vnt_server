const path = require('path')
const fileSystem = require('fs')
const Vehicle = require('../models/Vehicle')
const Trip = require('../models/Trip')
const Station = require('../models/Stations')
const Notification = require("../models/Notification")
const Ticket = require("../models/Ticket")
const Review = require("../models/Review")
const Transportation = require("../models/Transportation")
const MergeTrip = require('../models/MergeTrip')

const addNotification = (req, res, next) => {
    Notification.addNotification(req.body.id_user_from, req.body.id_user_to, req.body.title, req.body.content)
    return res.status(201).json({ message: "success" })
}

const addTrip = (req, res, next) => {
    Trip.addTrip(req.body.id_coach, req.body.price, req.body.start_time, req.body.end_time, req.body.id_start_station, req.body.id_end_station, function (err, r) {
        if (err) next(err)
        return res.status(201).json({ message: "success" })
    })
}

const addVehicle = (req, res, next) => {
    Vehicle.getVehicleByLicensePlate(req.body.license_plate, function (err, r) {
        if (err) next(err)
        if (r.length > 0) {
            return res.status(200).json({ error: { message: 'Biển số xe đã tồn tại.' } })
        }
        else {
            Vehicle.getVehicleByPhone(req.body.phone, function (err, r) {
                if (err) next(err)
                if (r.length > 0) {
                    return res.status(200).json({ error: { message: 'Số điện thoại đã đăng ký cho xe khác.' } })
                }
                else {
                    Vehicle.getVehicleType(req.body.type, function (err, r) {
                        if (err) next(err)
                        else {
                            Vehicle.addVehicle(req.body.license_plate, req.body.phone, r[0].id, req.body.id_transportation, function (err, vehicle) {
                                if (err) next(err)
                                return res.status(201).json({ message: "success" })
                            })
                        }


                    })
                }
            })
        }
    })
}

const deleteTransportationComment = (req, res, next) => {
    Review.deleteTransportationComment(req.query.id, function (err, comment) {
        if (err) next(err);
        return res.status(200).json({ message: "success" })
    });
}

const deleteVehicle = (req, res, next) => {
    Vehicle.deleteVehicle(req.query.phone, function (err, vehicle) {
        if (err) next(err);
        return res.status(200).json({ message: "success" })
    });
}

const endTrip = (req, res, next) => {
    Trip.endTrip(req.query.idTrip, function (err, trips) {
        if (err) next(err);
        return res.status(200).json({ message: "success" })
    });
}

const getAllProvince = (req, res, next) => {
    Station.getAllProvince(function (err, provinces) {
        if (err) next(err);
        return res.status(200).json({ provinces })
    });
}

const getAllVehicle = (req, res, next) => {
    Vehicle.getAllVehicle(req.query.id_transportation, function (err, vehicles) {
        if (err) next(err);
        return res.status(200).json({ vehicles })
    });
}

const getAllVehicleType = (req, res, next) => {
    Vehicle.getAllVehicleType(function (err, vehicle_type) {
        if (err) next(err);
        return res.status(200).json({ vehicle_type })
    });
}

const getDoneTrips = (req, res, next) => {
    Trip.getDoneTrips(req.query.idTransportation, function (err, trips) {
        if (err) next(err);
        return res.status(201).json({ trips })
    });
}

const getStations = (req, res, next) => {
    Station.getStations(req.query.id_province, function (err, stations) {
        if (err) next(err);
        return res.status(200).json({ stations })
    });
}

const getReviews = (req, res, next) => {
    Review.getReviews(req.query.idTransportation, function (err, reviews) {
        if (err) next(err);
        return res.status(200).json({ reviews })
    });
}

const getTransportation = (req, res, next) => {
    Transportation.getTransportationByID(req.query.idTransportation, function (err, transportation) {
        if (err) next(err);
        return res.status(201).json({ transportation })
    });
}

const getTransportationVehicles = (req, res, next) => {
    Vehicle.getTransportationVehicles(req.query.idTransportation, function (err, vehicles) {
        if (err) next(err);
        return res.status(201).json({ vehicles })
    });
}

const getTripByID = (req, res, next) => {
    Trip.getTripByID(req.query.idTrip, function (err, trip) {
        if (err) next(err);
        return res.status(201).json({ trip })
    });
}

const getTrips = (req, res, next) => {
    Trip.getTrips(req.query.idTransportation, function (err, trips) {
        if (err) next(err);
        return res.status(201).json({ trips })
    });
}

const mergeTrip = async (req, res, next) => {
    var json_data = JSON.parse(req.body.list)
    var list_id_merge_trip = new Array()
    for (var i in json_data) {
        if (i % 2 == 1) {
            list_id_merge_trip.push(json_data[i]);
        }
    }
    list_merge_trip = await new Promise((rs) => {
        Trip.getDetailMergeTrips(list_id_merge_trip, (result) => {
               rs(result)
            })
    })
    console.log("zzzzzzzzzzzzzzzzz:>>>", list_merge_trip)
   
}

const returnComment = (req, res, next) => {
    Review.returnComment(req.body.id, req.body.comment, function (err, comment) {
        if (err) next(err);
        return res.status(200).json({ message: "success" })
    });
}

const startTrip = (req, res, next) => {
    Trip.startTrip(req.query.idTrip, function (err, trips) {
        if (err) next(err);
        return res.status(200).json({ message: "success" })
    });
}

const stopTrip = (req, res, next) => {
    //gui thong bao den khach da dat ve chuyen di nay
    Ticket.getUsersBookTrip(req.query.idTrip, function (err, users) {
        if (err) next(err);
        for (var i = 0; i < users.length; i++) {
            Notification.addNotification(req.body.id_user_from, users[i].id_user, req.body.title, req.body.content)
        }
    });
    //xoa chuyen di
    Trip.stopTrip(req.query.idTrip, function (err, trips) {
        if (err) next(err);
        return res.status(200).json({ message: "success" })
    });
}

module.exports = {
    addNotification,
    addTrip,
    addVehicle,
    deleteTransportationComment,
    deleteVehicle,
    endTrip,
    getAllProvince,
    getAllVehicle,
    getAllVehicleType,
    getDoneTrips,
    getStations,
    getReviews,
    getTransportation,
    getTransportationVehicles,
    getTripByID,
    getTrips,
    mergeTrip,
    returnComment,
    startTrip,
    stopTrip
}