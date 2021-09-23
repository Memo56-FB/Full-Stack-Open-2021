const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  const { id } = request.params
  try {
    const blogReturned = await Blog.findById(id)
    !blogReturned ? response.status(404).json({ error: 'there\'s not a blog' }).end() : response.status(200).json(blogReturned).end()
  } catch (error) {
    next(error)
  }
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

blogsRouter.put('/:id', async (request, response, next) => {
  const { id } = request.params
  const body = request.body
  const blog = {
    likes: body.likes
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
    response.status(200).json(updatedBlog).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const { id } = request.params
  try {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
