const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema({
  supportedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  supportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  message: String,
  price: Number,
  number: Number,
  expiry: { type: Date },
});

module.exports = new mongoose.model("Support", supportSchema);
