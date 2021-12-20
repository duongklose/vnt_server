const express = require('express')
const router = express.Router()

const AdminController = require('../controllers/admin')

router.route('/getNumofUser').get(AdminController.getNumofUser)

router.route('/getNumofTransportation').get(AdminController.getNumOfTransportation)

module.exports = router