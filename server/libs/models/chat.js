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
    createdAt: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Chat', chatSchema);
