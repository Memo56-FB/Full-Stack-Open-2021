const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

http.createServer(app)

const server = app.listen(config.PORT)
logger.info(`Server running on http://localhost:${config.PORT}`)

module.exports = { server }
