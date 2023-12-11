const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    description: String,
    imageUrl: String,
    price: Number,
    supporters: [],
    supportedenvTo: [],
    mySupports: [],
    socials: {
        "twitter": String,
        "pinterest": String,
        "medium": String,
        "linkedin": String,
        "youtube": String,
        "instagram": String
    },
    myPosts: [{ type: mongoose.Schema.Types.ObjectId }],
    myPolls: [{ type: mongoose.Schema.Types.ObjectId }],
    polledTo: [{ type: mongoose.Schema.Types.ObjectId }]
})

module.exports = new mongoose.model("User", userSchema)