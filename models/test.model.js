const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
  value: Number
})

module.exports = new mongoose.model("Test", testSchema)