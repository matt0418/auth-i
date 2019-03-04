const bcrypt = require('bcryptjs')
const router = require('express').Router()
const Users = require('./helperFunctions')

//Test Route
// router.get('/', (req, res) => {
//     res.send({message: "more work"})
// })


// Get users route with specific use of a restricted element instead of middleware

// router.get('/', async (req, res) => {
//     let { username, password } = req.headers
//     if (username && password) {
//         try {
//             const user = await Users.findBy({ username }).first()
//                 if (user && bcrypt.compareSync(password, user.password)) {
//                     const users = await Users.find()
//                     res.status(200).json(users)
//                 } else {
//                     res.status(401).json({ message: "* Angry Wizard Noises *" })
//                 }
//         } catch(error) {
//             console.log(error)
//             res.status(500).json(error)
//         }
//     } else {
//         res.send({ message: "Please provide both username and password" })
//     }
// })

//Route that uses middleware
router.get('/', async (req, res) => {
   try {
       const users = await Users.find()
       res.status(200).json(users)
   }   catch(error) {
       console.log(error)
       res.status(500).json(error)
   }
})

module.exports = router