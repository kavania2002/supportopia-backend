const express = require('express');
const UserController = require('../controllers/user.controller');
const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/image/:id', UserController.image);
router.get('/creators/top', UserController.creatorsTop);

module.exports = router;