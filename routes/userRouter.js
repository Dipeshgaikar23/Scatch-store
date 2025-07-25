const express = require('express')
const router = express.Router()
const {registerUser, userLogin, logout} = require('../controllers/authController')

router.get('/', (req, res) => {
    res.send('hey')
})

router.post('/register', registerUser)

router.post('/login', userLogin)

// router.get('/logout', logout)

module.exports = router;