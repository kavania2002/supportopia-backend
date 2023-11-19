const mongoose = require('mongoose')

const commendSchema = new mongoose.Schema({
    commentedOn: { type: mongoose.Types.ObjectId },
    commentedBy: { type: mongoose.Types.ObjectId },
    postId: { type: mongoose.Types.ObjectId },
    
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
}
)