const express = require('express')
const authController = require('../controllers/auth.controller')
const authRoutes = express.Router()

authRoutes.post('/signup', authController.signup)
authRoutes.post('/login', authController.login)
authRoutes.post('/refresh', authController.refresh)

module.exports = authRoutes
