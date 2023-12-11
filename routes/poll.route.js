const express = require("express");
const router = express.Router();
const pollController = require("../controllers/poll.controller");
const authenticateUser = require("../middlewares/auth.middleware");

router.post("/add", authenticateUser, pollController.addPoll);
router.post('/vote', authenticateUser, pollController.addVote)

module.exports = router;
