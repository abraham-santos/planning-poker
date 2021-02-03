const { Schema, model } = require('mongoose');

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
    unhiddenvotes: {
        type: Boolean,
        default: false
    },
    estimation: {
        type: Number,
        default: 0
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }]
}, {
    timestamps: true
})

module.exports = model('Room', roomSchema);