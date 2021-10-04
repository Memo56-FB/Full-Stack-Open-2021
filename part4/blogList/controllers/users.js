const userRouter = require('express').Router()

const { User } = require('../models/user')

const bcrypt = require('bcrypt')

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    next(error)
  }
})

userRouter.post('/', async (req, res, next) => {
  try {
    const { username, name, password } = req.body
    let passWordhash
    password.length < 3
      ? res.status(400).json({ error: 'Minimum length of password must be three' })
      : passWordhash = await bcrypt.hash(password, 10)

    const user = new User({
      username,
      name,
      passWordhash
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = { userRouter }
