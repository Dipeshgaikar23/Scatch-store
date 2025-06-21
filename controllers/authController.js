const userModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { generateToken } = require('../utils/generateToken')


module.exports.registerUser = async (req, res) => {

    try {
        let { email, password, fullname } = req.body


        let user = await userModel.findOne({ email: email })
        if (user) {
            req.flash('error', ' You already have an account, Please Login')
            return res.redirect('/')
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message)
                else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname
                    })


                    let token = generateToken(user)
                    res.cookie('token', token)
                    req.flash('error', 'user created successfully')
                    return res.redirect('/')
                }
            })
        })


    }
    catch (err) {
        res.send(err.message)
    }
}

module.exports.userLogin = async (req, res) => {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email: email })

    if (!user) {
        req.flash('error', 'Credentials does not match')
        return res.redirect('/')
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = generateToken(user)
            res.cookie('token', token)
            res.render('shop')
        } else {
            req.flash('error', 'Credentials does not match')
            return res.redirect('/')
        }
    })
}

module.exports.logout = (req, res) => {
    res.cookie("token", '')
    res.redirect('/')
}