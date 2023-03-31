const mongoose = require('mongoose')

const Schema = mongoose.Schema

const toDoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    dueDate: {
        type: String,
        required: true,
    },
    isDone: {
        type: Boolean,
        default: false,
    },
    tags: {
        type: [String],
        required: false,
    },
    user_id: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('ToDo', toDoSchema)
