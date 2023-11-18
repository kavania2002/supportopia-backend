require('dotenv').config()

const PORT = process.env.PORT || 8000

// connect to the database
require("./utils/database.utils").connect();

const express = require('express')
const cors = require('cors')

const app = express()

app.use(
  cors(),
  express.json()
)

app.get('/ping', (req, res) => {
  console.log(`${req.method}: ${req.originalUrl}`)
  res.send('Hello World!')
})

app.use('/api', require('./routes'))

app.listen(PORT, err => {
  if (err) console.log(err)
  else console.log(`Server up and running at ${PORT}`)
})
