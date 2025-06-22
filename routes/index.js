const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const productModel = require('../models/product-model')
const userModel = require('../models/user-model')

router.get('/',(req, res)=>{
    let error = req.flash('error')
    res.render('index', {error, loggedIn: false})
})

router.get('/logout', (req, res)=>{
    res.cookie("token", '')
    res.redirect('/')
})

router.get('/shop', isLoggedIn, async (req, res)=>{
    let products = await productModel.find()
    let success = req.flash('success')
    let error = req.flash('error')
    res.render('shop', {products, success, error})
})

router.get('/cart', isLoggedIn, async (req, res)=>{
    // let products = await productModel.find()
    let user = await userModel.findOne({email: req.user.email}).populate('cart')

    res.render('cart', {user})
})

router.get('/addtocart/:productid', isLoggedIn, async (req, res)=>{
    let user = await userModel.findOne({email: req.user.email})
    // console.log(req.params.productid)
    user.cart.push(req.params.productid)
    await user.save()
    req.flash('success', 'Product added to cart')
    res.redirect('/shop')
})

module.exports = router;
