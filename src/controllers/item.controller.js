const { StatusCodes } = require('http-status-codes')
const Item = require('../models/item.model')

const findAll = async (req, res) => {
  try {
    const items = await Item.find()
    res.status(StatusCodes.OK).json(items)
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message })
  }
}

const find = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    if (!item) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Cannot find item' })
    }
    return res.status(StatusCodes.OK).json(item)
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message })
  }
}

const create = async (req, res) => {
  const item = new Item({
    name: req.body.name,
    description: req.body.description,
  })
  try {
    const newItem = await item.save()
    return res.status(StatusCodes.CREATED).json(newItem)
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message })
  }
}

const update = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    console.log(item)
    if (!item) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Cannot find item' })
    }
    return res.status(StatusCodes.OK).json(item)
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message })
  }
}

const remove = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id)
    if (!item) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Cannot find item' })
    }
    return res.status(StatusCodes.NO_CONTENT)
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message })
  }
}

module.exports = {
  create,
  find,
  findAll,
  update,
  remove,
}
