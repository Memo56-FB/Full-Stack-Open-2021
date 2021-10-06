const { Schema, model } = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

const userEschema = new Schema({
  username: {
    type: String,
    unique: true,
    minlength: 3,
    required: true
  },

  name: String,

  passwordHash: {
    type: String,
    required: true
  },

  blogs: [{
    type: Schema.Types.ObjectId,
    ref: 'Blog'
  }]
})

userEschema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id
    delete returnedObj._id
    delete returnedObj.__v

    delete returnedObj.passwordHash
  }
})

userEschema.plugin(mongooseUniqueValidator)
const User = model('User', userEschema)

module.exports = { User }
