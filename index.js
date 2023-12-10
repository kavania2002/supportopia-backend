require('dotenv').config()
const PORT = process.env.PORT || 8000

// connect to the database
require("./utils/database.utils").connect();

const express = require('express')
const cors = require('cors')
const logRequest = require('./middlewares/request.middleware');

const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

app.use(
  cors(),
  express.json()
)

app.use((req, res, next) => {
  logRequest(req, res, next)
})

app.use(express.urlencoded({extended:true}));

app.get('/ping', (req, res) => {
  console.log(req.body);
  res.send('Hello World!')
})

app.use('/api', require('./routes'))

app.listen(PORT, err => {
  if (err) console.log(err)
  else console.log(`Server up and running at ${PORT}`)
})
