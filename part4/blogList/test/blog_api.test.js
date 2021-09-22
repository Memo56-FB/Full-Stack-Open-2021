const app = require('../app')
const { server } = require('../index')
const Blog = require('../models/blog')
const initialBlogs = require('./helpers')

const mongoose = require('mongoose')
const supertest = require('supertest')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  for (const blog of initialBlogs) {
    const blogObj = new Blog(blog)
    await blogObj.save()
  }
})
describe('api proofs', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /json/)
  })
  test('contain id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.map(body => body.id)).toBeDefined()
  })

  test('post method', async () => {
    await api
      .post('/api/blogs')
      .send({
        title: 'pruebaDesdeJest',
        author: 'GuillermoJest',
        url: 'https://Blog/guillermo-blog-Jest',
        likes: 53235
      })
      .expect(201, /GuillermoJest/)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)
  })
  test('post with no likes must be 0', async () => {
    await api
      .post('/api/blogs')
      .send({
        title: 'Desencuentro',
        author: 'Residente',
        url: 'https://open.spotify.com/track/0kc4G5tEdtmTB0w3gYmb01?si=e1f189604e894f40'
      })
      .expect(201, /"likes":0/)
  })
  test('post with no title and url return 400', async () => {
    await api
      .post('/api/blogs')
      .send({
        author: 'Residente'
      })
      .expect(400, { error: 'content missing' })
  })
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})
