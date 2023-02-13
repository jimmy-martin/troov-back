const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Missing authorization header' })
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decodedToken.userId
    req.auth = {
      userId,
    }
    next()
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: err.message })
  }
}

module.exports = authMiddleware
