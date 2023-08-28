const mongoose = require('mongoose')
const Stock =  require('./stock')

const suppliesSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: true,
    },
    lot: {
        type: Number,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    material: {
        type: String,
        required: true,
    },
})

const Supplies = Stock.discriminator('Supplies',suppliesSchema)

module.exports = Supplies