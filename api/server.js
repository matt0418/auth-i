const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const registerRouter = require('../userRoutes/registerRoutes')
const loginRouter = require('../userRoutes/loginRoutes')
const userRouter = require('../userRoutes/userRoutes')

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/register', registerRouter)
server.use('/api/login', loginRouter)
server.use('/api/users', userRouter)

module.exports = server