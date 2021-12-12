const User = require('../models/User');
const JWT = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/index')

const encodeToken = (id) => {
    return JWT.sign({
        iss: "adminVNT",
        sub: id,
        iat: new Date().getTime(),
        exp: new Date().setDate((new Date().getDate() + 7))
    }, JWT_SECRET)
}

const addAdmin = (req, res, next) => {
    //check exist username
    User.getUserByUsername(req.body.username, function (err, user) {
        if (err) next(err);
        if(user.length > 0) return res.status(403).json({ error:{message:'Username is already.'}})
        else{   //add new Admin
            User.addAdmin(req.body.username, req.body.pass, req.body.name, function (err, data) {
                if (err) next(err)
                // var u = {
                //     "id": data.insertId,
                //     "phone": req.body.phone,
                //     "password": req.body.password,
                //     "name": req.body.name
                // }

                //encode token
                const token = encodeToken(data.insertId)
                res.setHeader('Authorization', token)
                return res.status(201).json({ success: true })
            })
        }
    });
        
}

const getAll = (req, res) => {
    User.getAll(function (err, users) {
        if (err) next(err);
        return res.status(200).json({ users })
    });
}

const getUser = (req, res, next) => {
    User.getUserById(req.query.id, function (err, user) {
        if (err) next(err);
        // var u = new User(user[0])
        // console.log(u)
        return res.status(200).json({ user })
    });
}

const login = (req, res, next) => {

}

module.exports = {
    addAdmin,
    getAll,
    getUser,
    login
}