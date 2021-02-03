const roomSchema = new Schema({
    id: {
        type: Number,
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
    unhiddenvotes: Boolean,
    estimation: Number
}, {
    timestamps: true
})

module.exports = model('Room', roomSchema);