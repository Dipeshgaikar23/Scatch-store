const express = require('express')
const app = express()
const port = 3000
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('./config/mongoose-connection')
const ownerRouter = require('./routes/ownerRouter')
const userRouter = require('./routes/userRouter')
const productRouter = require('./routes/productRouter')
const index = require('./routes/index')
const path = require('path')
const expressSession = require('express-session')
const flash = require('connect-flash')

require('dotenv').config();

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.JWT_KEY
    })
)

app.use(flash())
app.use('/', index)
app.use('/owners', ownerRouter)
app.use('/users', userRouter)
app.use('/products', productRouter)

app.listen(port, () => {
    console.log(`Example app listening on port localhost:${port}`)
})