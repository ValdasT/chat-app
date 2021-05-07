const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    notifier: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    notifiee: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    notifyAbout: {
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
    url: {
        type: String,
        required: true
    },
    seen: {
        type: Boolean,
        required: true
    },
    clicked: {
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model('Notification', notificationSchema);