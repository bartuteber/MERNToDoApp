const ToDo = require('../models/toDoModel')
const mongoose = require('mongoose')

// get all toDos
const getToDos = async (req, res) => {
    const user_id = req.user._id

    const toDos = await ToDo.find({ user_id }).sort({ createdAt: -1 })

    res.status(200).json(toDos)
}

// create new toDo
const createToDo = async (req, res) => {
    const { title, dueDate, image, isDone, tags } = req.body
    if (!title || !dueDate) {
        return res
            .status(400)
            .json({ error: 'Title and due date must be filled' })
    }

    try {
        const user_id = req.user._id
        const toDo = await ToDo.create({
            title,
            dueDate,
            image,
            isDone,
            tags,
            user_id,
        })
        res.status(200).json(toDo)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get a single toDo
const getToDo = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such toDo' })
    }

    const toDo = await ToDo.findById(id)

    if (!toDo) {
        return res.status(404).json({ error: 'No such toDo' })
    }

    res.status(200).json(toDo)
}

// delete a toDo
const deleteToDo = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such toDo' })
    }

    const toDo = await ToDo.findOneAndDelete({ _id: id })

    if (!toDo) {
        return res.status(400).json({ error: 'No such toDo' })
    }

    res.status(200).json(toDo)
}

// update a toDo
const updateToDo = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such toDo' })
    }

    const toDo = await ToDo.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    )

    if (!toDo) {
        return res.status(400).json({ error: 'No such toDo' })
    }

    res.status(200).json(toDo)
}

module.exports = {
    getToDos,
    getToDo,
    createToDo,
    deleteToDo,
    updateToDo,
}
