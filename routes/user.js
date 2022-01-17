const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user')
const passport = require('passport')
const passportConfig = require('../middlewares/passport')

router.route('/checkLoggedIn')
    .get(UserController.checkLoggedIn)

router.route('/getAll')
    .get(UserController.getAll)
    .post()
    .patch()
    .delete()
    .put()

router.route('/getUser')
    .get(UserController.getUser)

router.route('/addAdmin')
    .post(UserController.addAdmin)

router.route('/login').post(UserController.signin)

router.route('/verify').get(UserController.verifyToken)

// router.route('/secret').get(passport.authenticate('jwt', {session: false }), UserController.secret)

module.exports = router