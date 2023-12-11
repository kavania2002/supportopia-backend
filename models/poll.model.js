const mongoose = require('mongoose')

const pollSchema = new mongoose.Schema({
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    questions: [String],
    votes: [
        [
            { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
        ]
    ]
})

module.exports = new mongoose.model("Poll", pollSchema)