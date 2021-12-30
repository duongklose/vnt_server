const express = require('express')
const router = express.Router()

const HomeController = require('../controllers/home')

router.route('/addVehicle').post(HomeController.addVehicle)

router.route('/deleteVehicle').delete(HomeController.deleteVehicle)

router.route('/getAllVehicleType').get(HomeController.getAllVehicleType)

router.route('/getTransportationVehicles').get(HomeController.getTransportationVehicles)

module.exports = router