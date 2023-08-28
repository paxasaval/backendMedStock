const mongoose = require('mongoose')
const Stock =  require('./stock')

const medicinesSchema = new mongoose.Schema({
    officialName: {
        type: String,
        required: true,
    },
    lot: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    activeIngredient: {
        type: String,
        required: true,
    },
})

const Medicines = Stock.discriminator('Medicines',medicinesSchema)

module.exports = Medicines