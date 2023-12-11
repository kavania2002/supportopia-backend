const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    title: String,
    description: String,
},
    {
        timestamps: {
            createdAt: "created_by",
            updatedAt: "updated_at"
        }
    }
)

module.exports = new mongoose.model("Post", postSchema)