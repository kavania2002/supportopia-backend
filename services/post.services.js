const Post = require("../models/post.model");
const User = require("../models/user.model");

const PostService = {
  addPost: async (userId, data) => {
    try {
      const newPost = new Post({
        title: data.title,
        creatorId: userId,
        description: data.description,
      });

      await newPost.save();

      const creator = await User.findById(userId);
      creator.myPosts.push(newPost._id);
      await creator.save();

      return {
        data: newPost,
        message: "Post Added",
      };
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
};

module.exports = PostService;
