const bcrypt = require('bcryptjs')
const router = require('express').Router()
const Users = require('./helperFunctions')


router.get('/', (req, res) => {
    res.send({message: "im working"})
})

router.post('/', async (req, res) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 16)
    user.password = hash
    try {
        const uuser = await Users.add(user)
        res.status(201).json(uuser)
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router