const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    description: String,
    imageUrl: String,
    price: Number,
    supporters: [mongoose.Types.ObjectId],
    supportedTo: [mongoose.Types.ObjectId],
    mySupports: [mongoose.Types.ObjectId],
    socials: [String],
    myPosts: [mongoose.Types.ObjectId],
    myPolls: [mongoose.Types.ObjectId],
    polledTo: [mongoose.Types.ObjectId]
})

module.exports = new mongoose.model("User", userSchema)