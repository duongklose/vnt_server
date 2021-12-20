const User = require('../models/User');
const Transportation = require('../models/Transportation');



const addAdmin = (req, res, next) => {
    //check exist username
    User.getUserByUsername(req.body.username, function (err, user) {
        if (err) next(err);
        if (user.length > 0) return res.status(403).json({ error: { message: 'Username is already.' } })
        else {   //add new Admin
            User.addAdmin(req.body.username, req.body.password, req.body.name, function (err, data) {
                if (err) next(err)

                //encode token
                const token = encodeToken(data.insertId)
                res.setHeader('Authorization', token)
                return res.status(201).json({ success: true })
            })
        }
    });
}

const getNumOfTransportation = (req, res, next) => {
    Transportation.getNumOfTransportation(function (err, num) {
        if (err) next(err);
        var numOfTransportation = num[0].numoftransportation;
        return res.status(200).json({numOfTransportation})
    });
}

const getNumofUser = (req, res, next) => {
    User.getNumofUser(function (err, num) {
        if (err) next(err);
        var numofuser = num[0].numofuser;
        return res.status(200).json({numofuser})
    });
}

module.exports = {
    addAdmin,
    getNumOfTransportation,
    getNumofUser
}