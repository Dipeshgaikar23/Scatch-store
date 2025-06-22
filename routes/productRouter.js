const express = require('express')
const router = express.Router()
const upload = require('../config/multer-config')
const productModel = require('../models/product-model')

router.get('/', (req, res) => {
    res.send('hey')
})

router.post('/create', upload.single("image"), async (req, res) => {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body
    let product = await productModel.create({
        image: req.file.Buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor
    })
    res.send(product)
})

module.exports = router;