const router = require('express').Router()


router.get('/', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.send('yikes')
            } else {
                res.send('FOOL OF A TOOK, THROW YOURSELF IN NEXT TIME AND RID US OF YOUR STUPIDITY!')
            }
        })
    } else {
        res.end()
    }
})


module.exports = router