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

const addTransportation = (req, res, next) => {
    Transportation.getTransportationByPhone(req.body.phone, function (err, r) {
        if (err) next(err)
        if (r.length < 1) {
            Transportation.addTransportation(req.body.name, req.body.phone, req.body.description, function (err, user) {
                if (err) next(err);
                return res.status(201).json({ message: "success" })
            });
        }else{
            return res.status(200).json({ error: { message: 'Phone number is registed.' } })
        }
    })
}

const deleteTransportation = (req, res, next) => {
    Transportation.deleteTransportation(req.query.phone, function (err, transportation) {
        if (err) next(err);
        return res.status(200).json({ message: "success" })
    });
}

const getNumOfTransportation = (req, res, next) => {
    Transportation.getNumOfTransportation(function (err, num) {
        if (err) next(err);
        var numOfTransportation = num[0].numoftransportation;
        return res.status(200).json({ numOfTransportation })
    });
}

const getNumofUser = (req, res, next) => {
    User.getNumofUser(function (err, num) {
        if (err) next(err);
        var numofuser = num[0].numofuser;
        return res.status(200).json({ numofuser })
    });
}

const getAllTransportations = (req, res, next) => {
    Transportation.getAllTransportations(function (err, transportation) {
        if (err) next(err);
        return res.status(200).json({ transportation })
    });
}

module.exports = {
    addAdmin,
    addTransportation,
    deleteTransportation,
    getNumOfTransportation,
    getNumofUser,
    getAllTransportations
}