const express = require('express');
const UserController = require('../controllers/user.controller');
const authenticateUser = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
<<<<<<< HEAD
router.post('/image/:id', UserController.image);
router.get('/creators/top', UserController.creatorsTop);
=======
router.post('/name', authenticateUser, UserController.name);
router.post('/description', authenticateUser, UserController.description);
router.post('/image', authenticateUser ,UserController.image);
router.get('/:username', authenticateUser, UserController.getUser);
>>>>>>> 64f549895a2055d2f2d792ce91fbe540f6c7176b

module.exports = router;