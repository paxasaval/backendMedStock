const stockRoute = require('express').Router()
const Stock = require('../models/stock')

stockRoute.get('/all',async (req, res, next)=>{
    try {
        const stockBD = await Stock.find({})
        res.status(200).json(stockBD)
    } catch (error) {
        next(error)
    }
})

module.exports = stockRoute