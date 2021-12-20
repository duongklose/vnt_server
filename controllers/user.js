const User = require('../models/User');
const JWT = require('jsonwebtoken')
const { JWT_SECRET } = require('../configs/index')

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
                const token = encodeToken(result[0].id);
                const user = result[0];
                console.log('token ', token)
                return res.status(200).json({message: 'success',token, user})
            }else{
                return res.status(403).json({ error: { message: 'Wrong password' } })
            }
        }
    });
}

const secret = (req, res, next) => {
    console.log('Call to secret function.')
}

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    JWT.verify(token, JWT_SECRET, function (err, data) {
        if (err) return res.send(401);
        console.log('data ',data)
    });
}

module.exports = {
    addAdmin,
    getAll,
    getUser,
    secret,
    signin,
    verifyToken
}