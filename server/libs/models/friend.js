const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const friendSchema = new Schema({

    friend: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    connectedAt: {
        type: String,
        required: true
    },
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    ],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Friend', friendSchema);
