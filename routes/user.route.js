const express = require('express');
const UserController = require('../controllers/user.controller');
const authenticateUser = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/image/:id', authenticateUser ,UserController.image);
router.post('/name', authenticateUser, UserController.name);
router.post('/description', authenticateUser, UserController.description);

module.exports = router;