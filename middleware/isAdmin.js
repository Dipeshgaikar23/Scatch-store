const jwt = require('jsonwebtoken')
const userModel = require('../models/user-model')
const ownersModel = require('../models/owners-model')

module.exports = async (req, res, next) =>{
    if(!req.cookies.token){
        req.flash('error', ' You need to login first')
        return res.redirect('/')
    }
    try{
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY)
        let owner = await ownersModel.findOne({email: decoded.email}).select('-password')
        if(!owner) {
            req.flash('error', 'You cannot access the owner route')
            return res.redirect('/shop')
        }
        console.log(owner)
        req.owner = owner
        next()

    }catch(err){
        req.flash('error', err)
        console.log(err)
        res.redirect('/')
    }
}

