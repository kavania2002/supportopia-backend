const express = require('express');
const UserController = require('../controllers/user.controller');
const authenticateUser = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/creators/top', UserController.creatorsTop);
router.post('/name', authenticateUser, UserController.name);
router.post('/description', authenticateUser, UserController.description);
router.post('/image', authenticateUser ,UserController.image);
router.post('/update', authenticateUser, UserController.updateProfile)

// if user not authorized then show limited information
router.get('/:username', UserController.getUser);

module.exports = router;