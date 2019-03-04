const bcrypt = require('bcryptjs')
const router = require('express').Router()
const Users = require('./helperFunctions')

router.get('/', (req, res) => {
    res.send({ message: "Look at you go" })
})

module.exports = router