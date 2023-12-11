const mongoose = require('mongoose')

const supportSchema = new mongoose.Schema({
    supportedTo: { type: mongoose.Schema.Types.ObjectId },
    supportedBy: { type: mongoose.Schema.Types.ObjectId },
    name: String,
    message: String,
    number: Number,
    expiry: {type : Date}
})

module.exports = new mongoose.model("Support", supportSchema)