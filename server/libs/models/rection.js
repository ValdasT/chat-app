const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reactionSchema = new Schema({
    reaction: {
        type: String,
        required: true
    },
    messages: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    },
    createdAt: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Reaction', reactionSchema);