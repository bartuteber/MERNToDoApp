const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

const signinUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signin(email, password)
        const token = createToken(user._id)

        res.status(200).json({
            email: user.email,
            name: user.name,
            surname: user.surname,
            token,
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const signupUser = async (req, res, next) => {
    const { email, password, confirmPassword, name, surname } = req.body
    try {
        const user = await User.signup(
            email,
            password,
            confirmPassword,
            name,
            surname
        )
        const token = createToken(user._id)

        res.status(200).json({ email, name, surname, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { signupUser, signinUser }
