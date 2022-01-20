const Vehicle = require('../models/Vehicle')
const Trip = require('../models/Trip')
const Station = require('../models/Stations')

const addTrip = (req, res, next) => {
    Trip.addTrip(req.body.id_coach, req.body.price, req.body.start_time, req.body.end_time, req.body.id_start_station, req.body.id_end_station, function(err, r){
        if(err) next(err)
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

const deleteVehicle = (req, res, next) => {
    Vehicle.deleteVehicle(req.query.phone, function (err, vehicle) {
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

const getStations = (req, res, next) => {
    Station.getStations(req.query.id_province, function (err, stations) {
        if (err) next(err);
        return res.status(200).json({ stations })
    });
}

const getTransportationTrips = (req, res, next) => {
    Trip.getTransportationVehicles(req.query.idTransportation, function (err, trips) {
        if (err) next(err);
        return res.status(201).json({ trips })
    });
}

const getTransportationVehicles = (req, res, next) => {
    Vehicle.getTransportationVehicles(req.query.idTransportation, function (err, vehicles) {
        if (err) next(err);
        return res.status(201).json({ vehicles })
    });
}

module.exports = {
    addTrip,
    addVehicle,
    deleteVehicle,
    getAllProvince,
    getAllVehicle,
    getAllVehicleType,
    getStations,
    getTransportationTrips,
    getTransportationVehicles
}