const commentSerivce = require("../services/comment.service");

const commentController = {
  addComment: async (req, res) => {
    try {
      const result = await commentSerivce.addComment(req.user.id, req.body);
      res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Error Adding Comment" });
    }
  },
};

module.exports = commentController;
