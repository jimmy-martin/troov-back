const { StatusCodes } = require('http-status-codes')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const { saltRounds } = require('./auth.controller')

const findAll = async (req, res) => {
  try {
    const users = await User.find()
    return res.status(StatusCodes.OK).json(users)
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message })
  }
}

const find = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Cannot find user' })
    }
    return res.status(StatusCodes.OK).json(user)
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message })
  }
}

const update = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        password: hashedPassword,
      },
      {
        new: true,
      }
    )
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Cannot find user' })
    }
    return res.status(StatusCodes.OK).json(user)
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message })
  }
}

const remove = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Cannot find user' })
    }
    return res.status(StatusCodes.NO_CONTENT)
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message })
  }
}

module.exports = {
  find,
  findAll,
  update,
  remove,
}
