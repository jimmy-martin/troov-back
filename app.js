require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 8000

const dbConnect = require('./db')
dbConnect()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/items', require('./src/routes/item.routes'))
app.use('/users', require('./src/routes/user.routes'))

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
