const bcrypt = require('bcryptjs')
const router = require('express').Router()
const Users = require('./helperFunctions')

// router.get('/', (req, res) => {
//     res.send({message: "more work"})
// })

router.get('/', async (req, res) => {
    let { username, password } = req.headers
    if (username && password) {
        try {
            const user = await Users.findBy({ username }).first()
                if (user && bcrypt.compareSync(password, user.password)) {
                    const users = await Users.find()
                    res.status(200).json(users)
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
})

module.exports = router