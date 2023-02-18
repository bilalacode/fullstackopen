const bcrypt = require('bcrypt')
const userRouter = require('express').Router()

const User = require('../models/user')

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (password.length < 3) {
    return response
      .status(400)
      .send({ error: 'password should at least be 3 characters long' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blog', { title: 1, author : 1, likes: 1 })

  response.status(200).json(users)
})

userRouter.delete('/deleteall', async (request, response) => {
  await User.deleteMany({})
  response.status(202).send('all users deleted')
})

module.exports = userRouter
