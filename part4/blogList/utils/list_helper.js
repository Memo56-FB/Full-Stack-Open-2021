const dummy = blogs =>{
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
module.exports = {
    dummy,totalLikes
}