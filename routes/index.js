const express = require('express')
const router = express.Router()

router.use('/db', require('./test.route'))
router.use('/user', require('./user.route'))
router.use('/support', require('./support.route'))

module.exports = router
