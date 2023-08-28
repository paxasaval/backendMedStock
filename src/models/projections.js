const mongoose = require('mongoose')

const projectionsSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    site:{
        type: String,
        required: true,
    },
    period: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
})
projectionsSchema.set('toJSON',{
    transform:(doc,returnObj) => {
      returnObj.id = returnObj._id.toString()
      delete returnObj._id
      delete returnObj.__v
    }
  })
const Projections = mongoose.model('Projections',projectionsSchema)
module.exports = Projections