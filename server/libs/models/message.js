const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reactionSchema = new Schema({
    reaction: {
        type: String,
        required: true
    },
    createdAt: Date,
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const messageSchema = new Schema({
    chatId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    reactions: [reactionSchema],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Message', messageSchema);
