const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    creatorId: { type: mongoose.Types.ObjectId },
    comments: [{ type: mongoose.Types.ObjectId }],
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