const express = require('express')
const router = express.Router()

const AdminController = require('../controllers/admin')

router.route('/addTransportation').post(AdminController.addTransportation)

router.route('/blockUser').patch(AdminController.blockUser)

router.route('/deleteTransportation').delete(AdminController.deleteTransportation)

router.route('/deleteUser').delete(AdminController.deleteUser)

router.route('/getNumofUser').get(AdminController.getNumofUser)

router.route('/getNumofTransportation').get(AdminController.getNumOfTransportation)

router.route('/getAllTransportations').get(AdminController.getAllTransportations)

router.route('/getAllUsers').get(AdminController.getAllUsers)

router.route('/unblockUser').patch(AdminController.unblockUser)

module.exports = router