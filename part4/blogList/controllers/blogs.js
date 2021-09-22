const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = await new Blog(request.body)
  if (!blog.title || !blog.url) {
    response.status(400).json({ error: 'content missing' }).end()
  } else {
    blog.save()
    response.status(201).json(blog.toJSON())
  }
})

module.exports = blogsRouter
