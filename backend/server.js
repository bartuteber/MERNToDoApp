const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const userRoutes = require('./routes/users')
const toDoRoutes = require('./routes/todos')

const app = express()
dotenv.config()

app.use(express.json())

//enable app to use cors
app.use(cors())
//enable app to use morgan
app.use(morgan())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use('/api/todos', toDoRoutes)
app.use('/api/user', userRoutes)

const PORT = process.env.PORT || 5001

//connect to the database
mongoose
    .connect(process.env.CONNECTION_URL)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server Running on Port: http://localhost:${PORT}`)
        )
    )
    .catch((error) => console.log(`${error} did not connect`))
