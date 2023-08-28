const mongoose = require('mongoose')

const budgetSchema = new mongoose.Schema({
    reason: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    period: {
        type: String,
        required: true,
    },
})

const Budget = mongoose.model('Budget',budgetSchema)
module.exports = Budget