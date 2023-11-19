const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    description: String,
    imageUrl: String,
    price: Number,
    supporters: [{ type: mongoose.Types.ObjectId }],
    supportedTo: [{ type: mongoose.Types.ObjectId }],
    mySupports: [{ type: mongoose.Types.ObjectId }],
    socials: [String],
    myPosts: [{ type: mongoose.Types.ObjectId }],
    myPolls: [{ type: mongoose.Types.ObjectId }],
    polledTo: [{ type: mongoose.Types.ObjectId }]
})

module.exports = new mongoose.model("User", userSchema)