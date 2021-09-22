const app = require("../app")
const { server } = require('../index')
const Blog = require('../models/blog')
const initialBlogs  = require('./helpers')

const mongoose = require("mongoose")
const supertest = require("supertest")

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  for (const blog of initialBlogs){
    const blogObj = new Blog(blog)
    await blogObj.save()
  }
})
describe("api proofs", ()=>{
    test("notes are returned as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /json/)
    })
    test("contain id",async () => {
        const response = await api.get("/api/blogs")
        expect(response.body.map(body => body.id)).toBeDefined()
    })

    test("post method",async () => {
      await api
      .post("/api/blogs")
      .send({
        "title":"pruebaDesdeJest",
        "author":"GuillermoJest",
        "url":"https://Blog/guillermo-blog-Jest",
        "likes":53235
      })
      .expect(200, /GuillermoJest/)
      .expect('Content-Type', /application\/json/)
      
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(initialBlogs.length + 1)
    })
})


afterAll(()=>{
  server.close()
  mongoose.connection.close()
})
