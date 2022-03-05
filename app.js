require('dotenv').config()
const express = require('express')
const res = require('express/lib/response')
const logger = require('morgan')
const cors = require('cors')
const multer = require('multer');

const app = express()

const userRoute = require('./routes/user')
const adminRoute = require('./routes/admin')
const homeRoute = require('./routes/home')
const bodyParser = require('body-parser');
const req = require('express/lib/request')

//Middlewares
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use('/uploads', express.static('uploads'))

//Routes
app.use('/user', userRoute)
app.use('/admin', adminRoute)
app.use('/', homeRoute)
app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Server is OK.'
    })
})


//404 error
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

//Error handler function
app.use(() => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    //response to client
    return res.status(status).json({
        error: {
            message: error.message
        }
    })
})

const port = app.get('port') || 3000
app.listen(port, () => console.log(`Server is listening on port ${port}`))


