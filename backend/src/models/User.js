const { Schema, model } = require('mongoose');

// Define User schema
const userSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    valuevote: {
        type: Number,
        required: false
    },
    statusvote: {
        type: Boolean,
        required: false
    },
    ismoderator: {
        type: Boolean,
        required: false
    },
    showcards: {
        type: Boolean,
        required: false
    },
    roomname: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('User', userSchema);