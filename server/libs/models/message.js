const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    reactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Reaction'
    }],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Message', messageSchema);