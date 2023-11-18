const express = require('express')
const TestController = require('../controllers/test.controller')
const router = express.Router()

router.get('/get', TestController.getValues)
router.post('/add', TestController.addValues)

module.exports = router
