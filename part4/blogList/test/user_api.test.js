const { server } = require('../index')
const { api } = require('../utils/user_helper')

const mongoose = require('mongoose')
const { User } = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
})
describe('Post /api/users', () => {
  test('Fail if password length is less than 3', async () => {
    const invalidUser = {
      username: 'Memo23',
      name: 'Paco',
      password: 'a'
    }

    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400, { error: 'Minimum length of password must be three' })
  })
  test('Create a new user', async () => {
    const newUser = {
      username: 'MemoRoot',
      name: 'Guillermo Farfan Bivanco',
      password: 'contraseñaSegura'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  server.close()
  mongoose.connection.close(true)
})
