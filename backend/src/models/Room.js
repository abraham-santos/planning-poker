const { Schema, model } = require('mongoose');

// Define Room schema
const roomSchema = new Schema({
    roomname: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    },
    userstory: {
        type: String,
        required: true
    },
    estimation: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = model('Room', roomSchema);