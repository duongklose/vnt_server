const User = require('../models/User');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/index');
const { saveToken } = require('../models/User');
const Trip = require('../models/Trip')

const getTrips = (req, res) => {
    Trip.searchTrips(req.query.idStartProvince, req.query.idEndProvince, req.query.time, function (err, trips) {
        if (err)  res.send(err);
        res.send(trips)

    });
}

const encodeToken = (id) => {
    return JWT.sign({
        iss: "adminVNT",
        sub: id,
        iat: new Date().getTime(),
        exp: new Date().setDate((new Date().getDate() + 365))
    }, JWT_SECRET)
}

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

const checkLoggedIn = (req, res, next) => {
    User.getAllTokenUser(function(err, tokens){
        if(err) next(err)
        var check = false
        var token = req.headers.token
        token = token.replace('"', '')
        token = token.replace('"', '')
        console.log("token ", token)
        for(var i=0; i<tokens.length ; i++){
            if(token == tokens[i].token){
                check = true;
                break;
            }
        }
        if(check == true){
            return res.status(200).json({ message: "success" })
        }else{
            return res.status(201).json({ error: {message: "failed"} })
        }
    })
}

const getAll = (req, res, next) => {
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

const signin = (req, res, next) => {
    //check exist username
    User.getUserByUsername(req.body.username, function (err, result) {
        if (err) next(err);
        if (result.length < 1) return res.status(403).json({ error: { message: 'Username is not exist.' } })
        else {
            if(req.body.password == result[0].pass){
                const token = encodeToken(result[0].id)
                User.saveToken(result[0].id, token)
                const user = result[0];
                return res.status(200).json({message: 'success',token, user})
            }else{
                return res.status(403).json({ error: { message: 'Wrong password' } })
            }
        }
    });
}

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    JWT.verify(token, JWT_SECRET, function (err, data) {
        if (err) return res.send(401);
        console.log('data ',data)
    });
}

module.exports = {
    getTrips,
    addAdmin,
    checkLoggedIn,
    getAll,
    getUser,
    signin,
    verifyToken
}