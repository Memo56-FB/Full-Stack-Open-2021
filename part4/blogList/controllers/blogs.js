const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get('/', async (_request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })

  
blogsRouter.post('/', async (request, response) => {
    const blog = await new Blog(request.body)
  
    blog.save()
    response.json(blog.toJSON())
 
  })
  
module.exports = blogsRouter