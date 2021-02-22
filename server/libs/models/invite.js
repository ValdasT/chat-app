const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inviteSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Invite', inviteSchema);