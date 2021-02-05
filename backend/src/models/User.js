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
        required: false,
        default: false
    },
    ismoderator: {
        type: Boolean,
        required: true,
    },
    roomname: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('User', userSchema);