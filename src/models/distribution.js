const mongoose = require('mongoose')

const distributionSchema = new mongoose.Schema({
    route: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'route',
        required: true,
    },
    state: {
        type: Number,
        required: true,
    },
    charge: {
        type: String,
        required: true,
    },
})

const Distribution   = mongoose.model('Distribution',distributionSchema)
module.exports = Distribution