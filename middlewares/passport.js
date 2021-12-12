const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const {ExtractJwt} = require('passport-jwt')
const JWT_SECRET = require('../configs/index')

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: JWT_SECRET
}, (payload, done) => {
    try {
        console.log('payload ', payload)
    } catch (error) {
        done(error, false)
    }
}))