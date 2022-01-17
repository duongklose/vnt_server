const Vehicle = require('../models/Vehicle')
const Trip = require('../models/Trip')

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

const getAllVehicleType = (req, res, next) => {
    Vehicle.getAllVehicleType(function (err, vehicle_type) {
        if (err) next(err);
        return res.status(200).json({ vehicle_type })
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
    addVehicle,
    deleteVehicle,
    getAllVehicleType,
    getTransportationTrips,
    getTransportationVehicles
}