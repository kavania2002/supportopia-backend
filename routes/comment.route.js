const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller')
const authenticateUser = require('../middlewares/auth.middleware');

router.post('/add', authenticateUser, commentController.addComment)

module.exports = router;