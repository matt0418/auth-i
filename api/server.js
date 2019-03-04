const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const bcrypt = require('bcryptjs')
// const router = require('express').Router()
const Users = require('../userRoutes/helperFunctions')

const registerRouter = require('../userRoutes/registerRoutes')
const loginRouter = require('../userRoutes/loginRoutes')
const userRouter = require('../userRoutes/userRoutes')

const server = express()

async function restricted(req, res, next) {
    const {username, password} = req.headers
    if (username && password) {
        try {
            user = await Users.findBy({ username }).first()
            if (user && bcrypt.compareSync(password, user.password)) {
                next()
            } else {
                res.status(401).json({ message: "* Angry Wizard Noises *" })
            }
        } catch(error) {
            console.log(error)
            res.status(500).json(error)
        }
    } else {
        res.send({ message: "Please provide both username and password" })
    }
}

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/register', registerRouter)
server.use('/api/login', loginRouter)
server.use('/api/users', restricted, userRouter)

module.exports = server