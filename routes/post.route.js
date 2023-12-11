const express = require('express')
const postController = require('../controllers/post.controller');
const authenticateUser = require('../middlewares/auth.middleware');
const router = express.Router()

router.post('/add', authenticateUser, postController.addPost)

module.exports = router
