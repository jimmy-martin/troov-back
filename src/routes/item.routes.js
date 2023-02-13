const express = require('express')
const itemController = require('../controllers/item.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const itemRoutes = express.Router()

itemRoutes.get('/', itemController.findAll)
itemRoutes.post('/', authMiddleware, itemController.create)
itemRoutes.get('/:id', itemController.find)
itemRoutes.put('/:id', authMiddleware, itemController.update)
itemRoutes.delete('/:id', authMiddleware, itemController.remove)

module.exports = itemRoutes
