/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')
const url = process.env.MONGO_URI

console.log('connecting to ', url)

mongoose.connect(url).then(result => {
  console.log('connected to MongoDB')
}).catch(error => {
  console.log('error connecting to MongoDB:', error.message)
})

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      required: true
    },
    number: {
      minLength: 8,
      required: true
    }
  }
)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)