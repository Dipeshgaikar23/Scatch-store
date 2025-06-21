const express = require('express')
const router = express.Router()

router.get('/',(req, res)=>{
    res.send('hey')
})

router.get('/create',(req, res)=>{
    res.send('huihuihui')
})

module.exports = router;