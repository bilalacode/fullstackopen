const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const loginRouter = require('./controllers/login')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

//initial loggin message to indicate we are connecting to mongo
//using logger middleware

logger.info('Connecting to: ', config.MONGO_URI)

//using mongoose to connect to our mongoDB
mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    logger.info('Success! Connected to MongoDB :)')
  })
  .catch((error) => {
    logger.error('Error connecting to MongDB :( \n', error.message)
  })

app.use(cors()) //to enable cross origin policy
//app.use(express.static('build')) <-- not using this because no build for FE
app.use(express.json()) // this converts JS objects to JSON
app.use(middleware.requestLogger) //this custom middleware is gonna tell us which method used
app.use(middleware.tokenChecker)
app.use('/api/login', loginRouter)

app.use('/api/blogs', middleware.userExtractor, blogRouter) //the first part defines path. basically we didn't have to redifine paths again and again in the controller

app.use('/api/users', userRouter)

if(process.env.NODE_ENV == "test"){
  const testingRounter = require('./controllers/testing')
  app.use('/api/testing', testingRounter)
}

app.use(middleware.unknownEndpoint) //if we have an unknown endpoint, this will help determine
app.use(middleware.errorHandler) //for handeling errors :)

module.exports = app
