const express = require('express')
const router = express.Router()

router.use('/db', require('./test.route'))

module.exports = router
