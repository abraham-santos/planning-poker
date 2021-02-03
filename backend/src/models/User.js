const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    valuevote: {
        type: Number,
        require: false
    },
    statusvote: {
        type: Boolean,
        require: false
    }
}, {
    timestamps: true
})

module.exports = model('User', userSchema);