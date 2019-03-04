const bcrypt = require('bcryptjs')
const router = require('express').Router()
const Users = require('./helperFunctions')

router.get('/', (req, res) => {
    res.send({message: "im working on login"})
})

router.post('/', async (req, res) => {
    let { username, password } = req.body
    try {
        const user = await Users.findBy({ username }).first()
        if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({ message: `${user.username} is logged in` })
        } else {
            res.status(401).json({ message: '* Angry Wizard Noises *' })
        }
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router