const app = require('../app')
const { server } = require('../index')
const Blog = require('../models/blog')
const { initialBlogs } = require('../utils/blog_helper')
const { getToken } = require('../utils/blog_helper')

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
  describe('Get /api/blogs', () => {
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
  })
  describe('Post /api/blogs', () => {
    test('post method', async () => {
      const token = await getToken()
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
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
      const token = await getToken()
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Desencuentro',
          author: 'Residente',
          url: 'https://open.spotify.com/track/0kc4G5tEdtmTB0w3gYmb01?si=e1f189604e894f40'
        })
        .expect(201, /"likes":0/)
    })
    test('post with no title and url return 400', async () => {
      const token = await getToken()
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send({
          author: 'Residente'
        })
        .expect(400, { error: 'content missing' })
    })
    test('post without token return 401', async () => {
      await api
        .post('/api/blogs')
        .send({
          title: '¿Y la felicidad que?',
          author: 'Cansebero',
          url: 'https://open.spotify.com/track/24HYU0MQmeUQ6YLjl1o2NV?si=574d175332e94a97'
        })
        .expect(401, /token missing or invalid/)
    })
  })
  describe('Delete /api/blogs/:id', () => {
    test('delete a blog successful', async () => {
      const response = await api.get('/api/blogs')
      const blogToDelete = response.body[0]
      const token = await getToken()
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
    })
  })
  describe('Put /api/blogs/:id', () => {
    test('update likes successful', async () => {
      const response = await api.get('/api/blogs')
      const blogToUpdate = response.body[0]
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({ likes: 123 })
        .expect(200, /"likes":123/)
    })
  })
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})
