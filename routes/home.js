const express = require('express')
const router = express.Router()

const HomeController = require('../controllers/home')

router.route('/addVehicle').post(HomeController.addVehicle)

router.route('/deleteVehicle').delete(HomeController.deleteVehicle)

router.route('/getAllProvince').get(HomeController.getAllProvince)

router.route('/getStations').get(HomeController.getStations)

router.route('/getAllVehicle').get(HomeController.getAllVehicle)

router.route('/getAllVehicleType').get(HomeController.getAllVehicleType)

router.route('/getTransportationTrips').get(HomeController.getTransportationTrips)

router.route('/getTransportationVehicles').get(HomeController.getTransportationVehicles)

module.exports = router