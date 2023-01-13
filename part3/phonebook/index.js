const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const Person = require('./models/person')
const { response } = require('express')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

// let persons = [
//   {
//     "id": 1,
//     "name": "Arto Hellas",
//     "number": "040-123456"
//   },
//   {
//     "id": 2,
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523"
//   },
//   {
//     "id": 3,
//     "name": "Dan Abramov",
//     "number": "12-43-234345"
//   },
//   {
//     "id": 4,
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122"
//   }
// ]


//for adding entry through MongoDB

app.post('/api/persons', (request, response, next) => {
  // if (!request.body.name) return response.status(400).send(`Name field is invalid`).end()
  // if (!request.body.number) return response.status(400).send(`Phone number invalid`).end()

  // for (let person in persons) {
  //   if (person.name === request.body.name) return response.status(400).send(`{error: 'name must be unique}`)
  // }

  // const generateId = () => 1 + Math.max(...persons.map(person => person.id))

  // const person = request.body
  // person.id = generateId()

  // console.log(person)
  // persons = persons.concat(person)

  // response.json(persons)

  const body = request.body

  if (body.name === undefined || body.number === undefined) return response.status(400).json({ error: 'content missing' })

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => {
    // console.log("ERROR", error)
    // next(error)

    response.status(400).json(error.message)
    next(error)
  })


})


app.get('/api/persons', (request, response, next) => {
  // response.json(persons)

  Person.find({}).then(people => {
    console.log(people)
    response.json(people)
  }).catch(error => {
    next(error)
  })
})

app.get('/info', (request, response) => {
  response.send(`Phonebook has ${Person.find({}).then(people => people.length)} people.
    <br>
    ${new Date()}
    `)
})

app.get('/api/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // const person = persons.find(person => person.id === id)

  // person ? response.json(person) : response.status(404).end()

  Person.findById(request.params.id).then(person => response.json(person)).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // persons = persons.filter(person => person.id !== id)

  Person.findByIdAndDelete(request.params.id).then(result => {
    response.send(204).end()
  }).catch(error => {
    next(error)
  })

})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  console.log(body)


  const person = {
    name: body.name,
    number: body.number
  }

  const id = String(request.params.id)

  Person.findByIdAndUpdate(id, person, { new: true }).then(updatedPerson => {
    console.log(updatedPerson)
    response.json(updatedPerson)
  }).catch(error => {
    next(error)
  }
  )
})

const unknownEndPoint = (request, response) => {
  response.status(404).send({ error: 'unkown endpoint' })
}

app.use(unknownEndPoint)

const errorHandler = (error, request, response, next) => {


  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }


  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`App is running on port # ${PORT}`)
})

