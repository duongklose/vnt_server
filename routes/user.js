const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user')

router.route('/getAll')
    .get(UserController.getAll)
    .post()
    .patch()
    .delete()
    .put()

router.route('/newUser')
    .post(UserController.newUser)

router.route('/getUser')
    .get(UserController.getUser)


module.exports = router