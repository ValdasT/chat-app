const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const settingsSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: String,
        required: true
    },
    updatedAt: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Settings', settingsSchema);