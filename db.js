const mongoose = require('mongoose')

const dbConnect = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.DB_HOST, {
      dbName: process.env.DB_NAME,
    })
    console.log('MongoDB connected...')
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = dbConnect
