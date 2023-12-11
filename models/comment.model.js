const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    commentedOn: { type: mongoose.Schema.Types.ObjectId },
    commentedBy: { type: mongoose.Schema.Types.ObjectId },
    postId: { type: mongoose.Schema.Typesypes.ObjectId },
    description: String
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

module.exports = new mongoose.model("Comment", commentSchema)