const pollService = require("../services/poll.service");

const pollController = {
  addPoll: async (req, res) => {
    try {
      const result = await pollService.addNewPoll(req.user.id, req.body);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: "Error Adding New Poll",
      });
    }
  },

  addVote: async (req, res) => {
    try {
      const result = await pollService.addVote(req.user.id, req.body);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: "Error Adding Vote",
      });
    }
  },
};

module.exports = pollController;
