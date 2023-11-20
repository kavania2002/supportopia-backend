const mongoose = require('mongoose')

const supportSchema = new mongoose.Schema({
    supportedTo: { type: mongoose.Types.ObjectId },
    supportedBy: { type: mongoose.Types.ObjectId },
    name: String,
    message: String,
    number: Number
})

module.exports = new mongoose.Schema("Support", supportSchema)