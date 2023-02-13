const express = require('express')
const userController = require('../controllers/user.controller')
const userRoutes = express.Router()

userRoutes.get('/', userController.findAll)

userRoutes.post('/', userController.create)

userRoutes.get('/:id', userController.find)

userRoutes.put('/:id', userController.update)

userRoutes.delete('/:id', userController.remove)

module.exports = userRoutes
