require('dotenv').config()
const { MONGO_URI, MONGO_URI_TEST, NODE_ENV } = process.env
const url = NODE_ENV === 'test'
  ? MONGO_URI_TEST
  : MONGO_URI
const PORT = process.env.PORT || 3001
module.exports = {
  url, PORT
}
