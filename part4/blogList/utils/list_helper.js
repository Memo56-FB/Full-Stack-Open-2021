const _ = require('lodash')
const dummy = blogs => {
  return 1
}
const totalLikes = blogs => {
  if (blogs.length === 0) {
    return 0
  }
  const likesArray = blogs.map(blog => blog.likes)
  const result = likesArray.reduce((a, b) => a + b)
  return result
}
const favoriteBlog = blogs => {
  const likesArray = blogs.map(blog => blog.likes)
  const favoriteBlogLikes = Math.max(...likesArray)
  const favoriteBlogResult = blogs.filter(blog => {
    if (blog.likes === favoriteBlogLikes) {
      return blog
    } else {
      return null
    }
  })
  const finalResult = {
    title: favoriteBlogResult[0].title,
    author: favoriteBlogResult[0].author,
    likes: favoriteBlogResult[0].likes
  }
  return finalResult
}
const mostBlogs = blogs => {
  return _(blogs)
    .countBy('author')
    .map((blogs, author) => {
      return { author, blogs }
    })
    .sortBy('blogs')
    .value()
}
const mostLikes = blogs => {
  let prevName = blogs[0].author
  let likes = 0
  blogs.push({ author: 'x' })
  const arraySumLikes = []
  for (const blog in blogs) {
    if (prevName === blogs[blog].author) {
      likes += blogs[blog].likes
    } else {
      arraySumLikes.push({
        author: prevName,
        likes: likes
      })
      likes = blogs[blog].likes
      prevName = blogs[blog].author
    }
  }
  return _(arraySumLikes).sortBy('likes').value()
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
