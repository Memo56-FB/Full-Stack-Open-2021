const { server } = require('../index')
const { api } = require('../utils/user_helper')

const mongoose = require('mongoose')

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
})

afterAll(() => {
  server.close()
  mongoose.connection.close(true)
})
