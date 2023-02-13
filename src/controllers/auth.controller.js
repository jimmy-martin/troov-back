const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const saltRounds = 10

const signup = async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

  const user = new User({
    username: req.body.username,
    password: hashedPassword,
  })

  try {
    user.save()
    return res.status(StatusCodes.CREATED).json(user)
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message })
  }
}

const login = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username })

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'Cannot find user' })
  }

  try {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (!result) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: 'Unauthorized' })
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      })

      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        }
      )

      return res
        .status(StatusCodes.OK)
        .json({ userId: user._id, token: token, refreshToken: refreshToken })
    })
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message })
  }
}

const refresh = async (req, res, next) => {
  const refreshToken = req.body.refreshToken

  if (!refreshToken) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Unauthorized' })
  }

  try {
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )

    const userId = decodedToken.userId

    const token = jwt.sign(
      { userId: userId },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    )

    return res.status(StatusCodes.OK).json({ userId: userId, token: token })
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message })
  }
}

const authController = {
  login,
  refresh,
  signup,
  saltRounds,
}

module.exports = authController
