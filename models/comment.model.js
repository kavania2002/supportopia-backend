const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    postId: { type: mongoose.Schema.Typesypes.ObjectId, ref: 'Post' },
    description: String
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

module.exports = new mongoose.model("Comment", commentSchema)