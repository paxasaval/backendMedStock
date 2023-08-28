const mongoose = require('mongoose')
const Stock =  require('./stock')

const deviceSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
})

const Device = Stock.discriminator('Device',deviceSchema)

module.exports = Device