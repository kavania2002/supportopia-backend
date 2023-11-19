const mongoose = require('mongoose')

const pollSchema = new mongoose.Schema({
    creatorId: { type: mongoose.Types.ObjectId },
    questions: [String],
    votes: [
        [
            { type: mongoose.Types.ObjectId }
        ]
    ]
})

module.exports = new mongoose.model("Poll", pollSchema)