const express = require('express')
const router = express.Router()

const AdminController = require('../controllers/admin')

router.route('/addTransportation').post(AdminController.addTransportation)

router.route('/deleteTransportation').delete(AdminController.deleteTransportation)

router.route('/getNumofUser').get(AdminController.getNumofUser)

router.route('/getNumofTransportation').get(AdminController.getNumOfTransportation)

router.route('/getAllTransportations').get(AdminController.getAllTransportations)


module.exports = router