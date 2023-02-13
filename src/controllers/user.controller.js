const { StatusCodes } = require('http-status-codes')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const saltRounds = 10

const findAll = async (req, res) => {
  try {
    const users = await User.find()
    res.status(StatusCodes.OK).json(users)
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message })
  }
}

const find = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cannot find user' })
    }
    res.status(StatusCodes.OK).json(user)
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message })
  }
}

const create = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
  const user = new User({
    username: req.body.username,
    password: hashedPassword,
  })

  try {
    const newUser = await user.save()
    res.status(StatusCodes.CREATED).json(newUser)
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message })
  }
}

const update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    console.log(user)
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cannot find user' })
    }
    res.status(StatusCodes.OK).json(user)
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message })
  }
}

const remove = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cannot find user' })
    }
    res.status(StatusCodes.NO_CONTENT)
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message })
  }
}

module.exports = {
  create,
  find,
  findAll,
  update,
  remove,
}
