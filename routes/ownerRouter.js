const express = require('express')
const router = express.Router()
const ownerModel = require('../models/owners-model')
const isAdmin = require('../middleware/isAdmin')


router.get('/admin', isAdmin,(req, res)=>{
    let success = req.flash('success')
    res.render('createproducts', {success})
})

// console.log(process.env.NODE_ENV)

router.get('/create', (req, res)=>{
    res.render('owner-login')
})

if(process.env.NODE_ENV === "development"){
    router.post('/create',async (req, res)=>{
        let owners = await ownerModel.find()
        if(owners.length > 0){
            return res.status(503).send("You cannot create this account")
        }
        let {fullname, email, password} = req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        })
        res.status(201).send(createdOwner)
    })
}

router.post('/login',async (req, res)=>{
        let owners = await ownerModel.find()
        if(owners.length > 0){
            return res.status(503).send("You cannot create this account")
        }
        let {fullname, email, password} = req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        })
        res.status(201).send(createdOwner)
    })

module.exports = router;