const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    valuevote: {
        type: Number,
        require: 0
    },
    statusvote: {
        type: Boolean,
        require: false
    },
    ismoderator: {
        type: Boolean
    },
    roomid: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('User', userSchema);