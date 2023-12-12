const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, default: "Lorem Ipsum" },
  username: String,
  email: String,
  password: String,
  description: {
    type: String,
    default:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu imperdiet augue, ac viverra sapien. Proin auctor pellentesque velit, vitae placerat velit imperdiet ac. Sed fermentum, ipsum id hendrerit porta, mauris ex ultricies ex, ut elementum nunc enim sit amet metus. Proin feugiat, mi sagittis sodales lacinia, libero nisl dapibus. ",
  },
  imageUrl: { type: String, default: "" },
  price: { type: Number, default: 25 },

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
