require("dotenv").config()
const mongoose = require("mongoose")

const url = process.env.MONGO_URL
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
	.then(() => {console.log("connected to MongoDB")})
	.catch(error => console.log("error connecting to MongoDB: ",error.message))

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
    })
    
    const Blog = mongoose.model('Blog', blogSchema)



module.exports = Blog
      