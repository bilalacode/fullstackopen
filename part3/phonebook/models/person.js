const mongoose = require('mongoose')
// require('dotenv').config({path:__dirname+'/./../../.env'})


// if (process.argv.length < 3) {
//     console.log('Please provide the password as an argument: node mongo.js <password>')
//     process.exit(1)
// }

// const password = process.argv[2]


//variable stored in the env file
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
            type: String,
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

// const Person = mongoose.model('Person', personSchema)

// mongoose.connect(URI).then(result => {
//     console.log(`Connection established with the mongoDB database!`)
//     if (process.argv.length === 3) {
//         Person.find({})
//             .then((result => {
//                 result.forEach(person => {
//                     console.log(person)
//                 })
//                 mongoose.connection.close()
//             }))
//     } else if (process.argv.length === 5) {
//         const person = new Person({ name: process.argv[3], number: process.argv[4] })
//         person.save().then(result => {
//             console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`)
//             return mongoose.connection.close()

//         })

//     }
// })