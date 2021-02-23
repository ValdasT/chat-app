const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    createdAt: {
        type: String,
        required: true
    },
    updatedAt: {
        type: String,
        required: true
    },
    picColor: {
        type: String,
        required: true
    },
    createdEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Friend'
        }
    ],
    invites: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Invite'
        }
    ],
    settings:
    {
        type: Schema.Types.ObjectId,
        ref: 'Settings'
    }
});

userSchema.index({ name: 'text', surname: 'text' });

module.exports = mongoose.model('User', userSchema);