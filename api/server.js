const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const registerRouter = require('../userRoutes/registerRoutes')

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/register', registerRouter)

module.exports = server