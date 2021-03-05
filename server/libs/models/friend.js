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
    type: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Friend', friendSchema);
