const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

//initial loggin message to indicate we are connecting to mongo
//using logger middleware

logger.info('Connecting to: ', config.MONGO_URI)


//using mongoose to connect to our mongoDB
mongoose.connect(config.MONGO_URI)
    .then(() => {
        logger.info('Success! Connected to MongoDB :)')
    })
    .catch(error => {
        logger.error('Error connecting to MongDB :( \n', error.message)
    })

app.use(cors()) //to enable cross origin policy
//app.use(express.static('build')) <-- not using this because no build for FE
app.use(express.json()) // this converts JS objects to JSON
app.use(middleware.requestLogger) //this custom middleware is gonna tell us which method used
app.use('/api/blogs', blogRouter) //the first part defines path. basically we didn't have to redifine paths again and again in the controller

app.use(middleware.unknownEndpoint) //if we have an unknown endpoint, this will help determine
app.use(middleware.errorHandler) //for handeling errors :) 

module.exports = app