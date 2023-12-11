const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  description: String,
  imageUrl: String,
  price: Number,

  // list of supporters supporting me with their expiry of support
  supporters: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      expiry: Date,
    },
  ],

  // list of creators the person has supportedTo
  supportedTo: [],

  // all the transactions done on creator itself
  mySupports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Support" }],

  socials: {
    twitter: { type: String, default: "" },
    pinterest: { type: String, default: "" },
    medium: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    youtube: { type: String, default: "" },
    instagram: { type: String, default: "" },
  },
  myPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  myPolls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Poll" }],
  polledTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "Poll" }],
});

module.exports = new mongoose.model("User", userSchema);
