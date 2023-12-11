const postService = require("../services/post.services");

const postController = {
  addPost: async (req, res) => {
    try {
      const result = await postService.addPost(req.user.id, req.body);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error });
    }
  },
};

module.exports = postController;
