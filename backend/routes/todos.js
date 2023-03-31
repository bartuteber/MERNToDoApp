const express = require('express')
const {
    createToDo,
    getToDos,
    deleteToDo,
    getToDo,
    updateToDo,
} = require('../controllers/toDoController')
const requireAuth = require('./middleware/auth')

const router = express.Router()

router.use(requireAuth)

// GET all toDos
router.get('/list', getToDos)

//GET a single toDo
router.get('/get/:id', getToDo)

// POST a new toDo
router.post('/create', createToDo)

// DELETE a toDo
router.delete('/delete/:id', deleteToDo)

// UPDATE a toDo
router.patch('/update/:id', updateToDo)

module.exports = router
