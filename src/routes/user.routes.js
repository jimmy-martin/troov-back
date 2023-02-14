const express = require('express')
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const userRoutes = express.Router()

userRoutes.get('/', userController.findAll)
userRoutes.get('/:id', userController.find)
userRoutes.put('/:id', userController.update)
userRoutes.delete('/:id', userController.remove)

module.exports = userRoutes
