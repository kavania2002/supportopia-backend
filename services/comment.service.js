const mongoose = require("mongoose");
const Comment = require("../models/comment.model");
const Post = require("../models/post.model");

const commentService = {
  addComment: async (userId, data) => {
    try {
      const newComment = new Comment({
        commentedBy: userId,
        postId: data.postId,
        description: data.description,
      });

      await newComment.save();

      const foundPost = await Post.findById(data.postId);
      foundPost.comments.push(newComment._id);

      await foundPost.save();

      return {
        data: newComment,
        message: "Comment Added",
      };
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
};

module.exports = commentService;
