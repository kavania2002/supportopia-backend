const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  question: String,
  totalVotes: { type: Number, default: 0 },
  options: [String],
  votes: [[{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]],
  percentage: [],
});

module.exports = new mongoose.model("Poll", pollSchema);
