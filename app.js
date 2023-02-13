require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 8000

const dbConnect = require('./db')
const authMiddleware = require('./src/middlewares/auth.middleware')
dbConnect()

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/auth', require('./src/routes/auth.routes'))
app.use('/items', require('./src/routes/item.routes'))
app.use('/users', authMiddleware, require('./src/routes/user.routes'))

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
