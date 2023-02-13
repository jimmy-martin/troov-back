const Item = require('../models/item.model')

const findAll = async (req, res) => {
  try {
    const items = await Item.find()
    res.status(200).json(items)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const find = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    if (!item) {
      return res.status(404).json({ message: 'Cannot find item' })
    }
    res.status(200).json(item)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const create = async (req, res) => {
  const item = new Item({
    name: req.body.name,
    description: req.body.description,
  })
  try {
    const newItem = await item.save()
    res.status(201).json(newItem)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const update = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    console.log(item)
    if (!item) {
      return res.status(404).json({ message: 'Cannot find item' })
    }
    res.status(200).json(item)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const remove = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id)
    if (!item) {
      return res.status(404).json({ message: 'Cannot find item' })
    }
    res.status(204)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  create,
  find,
  findAll,
  update,
  remove,
}
