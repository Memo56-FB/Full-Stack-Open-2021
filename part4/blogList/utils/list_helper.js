const dummy = blogs => {
    return 1
}
const totalLikes = blogs => {
    if(blogs.length === 0){
        return 0
    }
    const likesArray = blogs.map(blog => blog.likes)
    const result = likesArray.reduce((a,b)=>a+b)
    return result
}
const favoriteBlog = blogs => {
    const likesArray = blogs.map(blog => blog.likes)
    const favoriteBlogLikes = Math.max(...likesArray)
    const favoriteBlogResult = blogs.filter(blog => {
        if(blog.likes === favoriteBlogLikes){
            return blog
        }
        else{
            return null
        }
    })
    const finalResult = {
        title: favoriteBlogResult[0].title,
        author:favoriteBlogResult[0].author,
        likes:favoriteBlogResult[0].likes
    }
    return finalResult
}
module.exports = {
    dummy,totalLikes,favoriteBlog
}