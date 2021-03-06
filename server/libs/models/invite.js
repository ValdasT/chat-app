const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inviteSchema = new Schema({
    invitor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    invitee: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    invitedTo: {
        type: String,
        required: true 
    },
    createdAt: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    notificationDoc: {
        type: Schema.Types.ObjectId,
        ref: 'Notification'
    },
});

module.exports = mongoose.model('Invite', inviteSchema);