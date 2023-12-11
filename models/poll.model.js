const mongoose = require('mongoose')

const pollSchema = new mongoose.Schema({
    creatorId: { type: mongoose.Schema.Types.ObjectId },
    questions: [String],
    votes: [
        [
            { type: mongoose.Schema.Types.ObjectId }
        ]
    ]
})

module.exports = new mongoose.model("Poll", pollSchema)