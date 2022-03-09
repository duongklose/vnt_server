const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user')

router.route('/addNewTicket').post(UserController.addTicket)

router.route('/getBookedSeats').get(UserController.getBookedSeats)

router.route('/cancelTicket').post(UserController.deleteTicket)

router.route('/getMyTicket').get(UserController.getMyTicket)

router.route('/getOldTicket').get(UserController.getOldTicket)

router.route('/getTrips').get(UserController.getTrips)

router.route('/getUserByPhone').get(UserController.getUserByPhone)

router.route('/checkLoggedIn')
    .get(UserController.checkLoggedIn)

router.route('/getAll')
    .get(UserController.getAll)

router.route('/getUser')
    .get(UserController.getUser)

router.route('/addAdmin')
    .post(UserController.addAdmin)

router.route('/login').post(UserController.signin)

router.route('/verify').get(UserController.verifyToken)

// router.route('/secret').get(passport.authenticate('jwt', {session: false }), UserController.secret)

module.exports = router