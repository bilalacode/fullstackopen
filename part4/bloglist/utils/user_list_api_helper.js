const User = require("../models/user");

const userInDb = async (request, response) => {
    const users = await User.find({})

    return users.map(user => user.toJSON())
}


module.exports = {userInDb}