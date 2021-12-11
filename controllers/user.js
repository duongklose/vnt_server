const User = require('../models/User');


const getAll = (req, res) => {
    User.getAll(function (err, users) {
        if (err) next(err);
        return res.status(200).json({ users })
    });
}

const newUser = (req, res, next) => {

}

const getUser = (req, res, next) => {
    User.getUserById(req.query.id, function (err, user) {
        if (err) next(err);
        // var u = new User(user[0])
        // console.log(u)
        return res.status(200).json({ user })
    });
}

module.exports = {
    getAll,
    newUser,
    getUser
}