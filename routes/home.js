const express = require('express')
const router = express.Router()

const HomeController = require('../controllers/home')

router.route('/addNotification').post(HomeController.addNotification)

router.route('/addTrip').post(HomeController.addTrip)

router.route('/addVehicle').post(HomeController.addVehicle)

router.route('/deleteTransportationComment').post(HomeController.deleteTransportationComment)

router.route('/deleteVehicle').delete(HomeController.deleteVehicle)

router.route('/endTrip').post(HomeController.endTrip)

router.route('/getAllProvince').get(HomeController.getAllProvince)

router.route('/getAllVehicle').get(HomeController.getAllVehicle)

router.route('/getAllVehicleType').get(HomeController.getAllVehicleType)

router.route('/getDoneTrips').get(HomeController.getDoneTrips)

router.route('/getStations').get(HomeController.getStations)

router.route('/getReviews').get(HomeController.getReviews)

router.route('/getTransportation').get(HomeController.getTransportation)

router.route('/getTransportationVehicles').get(HomeController.getTransportationVehicles)

router.route('/getTripByID').get(HomeController.getTripByID)

router.route('/getTrips').get(HomeController.getTrips)

router.route('/mergeTrip').post(HomeController.mergeTrip)

router.route('/returnComment').post(HomeController.returnComment)

router.route('/startTrip').post(HomeController.startTrip)

router.route('/stopTrip').post(HomeController.stopTrip)

module.exports = router