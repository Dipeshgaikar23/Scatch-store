const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const ownersModel = require('../models/owners-model')

router.get('/',(req, res)=>{
    let error = req.flash('error')
    res.render('index', {error})
})



// router.get('/shop', isLoggedIn, (req, res)=>{
//     ownersModel.
//     res.render('shop', {products})
// })

module.exports = router;
