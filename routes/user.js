const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user')

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

router.route('/login').post(UserController.login)

module.exports = router