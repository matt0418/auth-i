//core dependencies
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)
// const router = require('express').Router()

//Bring in Helper Functions with access to DB
const db = require('../databaseAccess/config')
const Users = require('../userRoutes/helperFunctions')


const sessionConfig = {
    name: 'wizard',
    secret: 'all that is gold does not glitter',
    cookie: {
        maxAge: 1000 * 60 * 25,
        secure: false
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
        knex: db,
        tableName: 'sessions',
        sidefieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 15
    })
}

//Imported Routes
const registerRouter = require('../userRoutes/registerRoutes')
const loginRouter = require('../userRoutes/loginRoutes')
const userRouter = require('../userRoutes/userRoutes')
const testRoute = require('../userRoutes/restrictedTestRoutes')
const logoutRoute = require('../userRoutes/logoutRoutes')

const server = express()

// Restricted Access function middleware
// async function restricted(req, res, next) {
//     const {username, password} = req.headers
//     if (username && password) {
//         try {
//             user = await Users.findBy({ username }).first()
//             if (user && bcrypt.compareSync(password, user.password)) {
//                 next()
//             } else {
//                 res.status(401).json({ message: "* Angry Wizard Noises *" })
//             }
//         } catch(error) {
//             console.log(error)
//             res.status(500).json(error)
//         }
//     } else {
//         res.send({ message: "Please provide both username and password" })
//     }
// }

function restricted(req, res, next) {
   console.log(req.session)
   console.log(req.session.username)
   if (req.session && req.session.username) {
       next()
   } else {
       res.status(401).json({ message: '* Angry Wizard Noises *'})
   }
}

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(session(sessionConfig))

server.use('/api/register', registerRouter)
server.use('/api/login', loginRouter)
server.use('/api/users', restricted, userRouter)
server.use('/api/restricted', restricted, testRoute)
server.use('/api/logout', logoutRoute)

module.exports = server