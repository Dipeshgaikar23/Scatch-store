const express = require('express')
const router = express.Router()
const ownerModel = require('../models/owners-model')
const isAdmin = require('../middleware/isAdmin')
const bcrypt = require('bcrypt')
const {generateToken} = require('../utils/generateToken')

router.get('/dashboard', isAdmin, (req, res) => {
    let success = req.flash('success')
    res.render('createproducts', { success })
})

// console.log(process.env.NODE_ENV)

router.get('/auth', (req, res) => {
    let error = req.flash('error')
    res.render('owner-login', { error })
})

// if (process.env.NODE_ENV === "development") {
router.post('/create', async (req, res) => {
    let owners = await ownerModel.find()
    if (owners.length > 0) {
        return res.status(503).send("You cannot create this account")
    }
    let { fullname, email, password } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) return res.send(err.message)
            else {
                let createdUser = await ownerModel.create({
                    email,
                    password: hash,
                    fullname
                })

                let token = generateToken(createdUser)
                res.cookie('token', token)
                req.flash('error', 'owner created successfully')
                return res.status(201).redirect('/owners/auth')
            }
        })

    })
})

    router.post('/login', async (req, res) => {
    let { email, password } = req.body;
    let owners = await ownerModel.findOne({email})
    if (!owners) {
        req.flash('error', 'Credentials does not match')
        return res.redirect('/owners/auth')
    }

    bcrypt.compare(password, owners.password, async (err, result) => {
        if (result) {
            let token = generateToken(owners)
            res.cookie('token', token)
            res.redirect('/owners/dashboard',)
        } else {
            req.flash('error', 'Credentials does not match')
            return res.redirect('/owners/auth')
        }
    })
})

    module.exports = router;