require("dotenv").config();

let MONGO_URI =
  process.env.NODE_ENV !== "test"
    ? process.env.MONGO_URI
    : process.env.TEST_MONGO_URI;
let PORT = process.env.PORT;
let SECRET = process.env.SECRET;
module.exports = { MONGO_URI, PORT, SECRET };
