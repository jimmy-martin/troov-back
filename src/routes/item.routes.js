const express = require('express')
const itemController = require('../controllers/item.controller')
const itemRoutes = express.Router()

itemRoutes.get('/', itemController.findAll)

itemRoutes.post('/', itemController.create)

itemRoutes.get('/:id', itemController.find)

itemRoutes.put('/:id', itemController.update)

itemRoutes.delete('/:id', itemController.remove)

module.exports = itemRoutes
