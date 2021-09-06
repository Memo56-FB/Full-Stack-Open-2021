require("dotenv").config()
const url = process.env.MONGO_URL
const PORT = process.env.PORT || 3001
module.exports = {
    url,PORT
}