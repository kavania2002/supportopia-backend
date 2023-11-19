const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    commentedOn: { type: mongoose.Types.ObjectId },
    commentedBy: { type: mongoose.Types.ObjectId },
    postId: { type: mongoose.Types.ObjectId },
    description: String
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

module.exports = new mongoose.model("Comment", commentSchema)