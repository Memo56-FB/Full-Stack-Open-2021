const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const { User } = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    blogs: 0
  })
  response.status(200).json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  const { id } = request.params
  try {
    const blogReturned = await Blog.findById(id).populate('user', {
      blogs: 0
    })
    !blogReturned ? response.status(404).json({ error: 'there\'s not a blog' }).end() : response.status(200).json(blogReturned).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body
  const { userId } = request
  const user = await User.findById(userId)

  if (!title || !url) {
    response.status(400).json({ error: 'content missing' }).end()
  } else {
    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id
    })
    await blog.save()
    user.blogs = user.blogs.concat(blog._id)
    await user.save()
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

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  try {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
