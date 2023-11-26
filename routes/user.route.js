const express = require('express');
const UserController = require('../controllers/user.controller');
const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/image/:id', UserController.image);

module.exports = router;