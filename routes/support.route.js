const express = require('express');
const supportController = require('../controllers/support.controller');
const authenticateUser = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/add', authenticateUser, supportController.addSuppoter);

module.exports = router;