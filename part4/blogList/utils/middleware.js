const jwt = require('jsonwebtoken')
require('dotenv').config()
const logger = require('./logger')
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.info('!!==================!!')
  logger.error('Error Name:', error.name)
  logger.info('!!==================!!')

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'SyntaxError') {
    return response.status(400).json({ error: 'content petition invalid' })
  }

  next(error)
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const userExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  let token = null

  if (authorization && authorization.toLocaleLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7)
  }

  let decodedToken = {}

  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch (error) {}

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const userId = decodedToken.id

  request.userId = userId

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor
}
