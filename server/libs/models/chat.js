const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    chatType: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Chat', chatSchema);
