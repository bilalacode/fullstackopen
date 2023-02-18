const User = require('../models/user')

// eslint-disable-next-line no-unused-vars
const userInDb = async (request, response) => {
  const users = await User.find({})

  return users.map(user => user.toJSON())
}

module.exports = { userInDb }