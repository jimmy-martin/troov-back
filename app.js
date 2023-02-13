require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 8000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
