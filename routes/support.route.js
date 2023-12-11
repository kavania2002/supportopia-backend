const express = require('express');
const supportController = require('../controllers/support.controller');
const router = express.Router();

router.post('/add', supportController.addSuppoter);

module.exports = router;