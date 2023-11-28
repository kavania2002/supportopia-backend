const express = require('express');
const UserController = require('../controllers/user.controller');
const authenticateUser = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/image', authenticateUser ,UserController.image);
router.get('/:username', authenticateUser, UserController.getUser);

module.exports = router;