const mongoose = require('mongoose')

const historicalSchema = new mongoose.Schema({
    period: {
        type: String,
        required: true,
    },
    historic:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Historic',
        required: false,
    }]
})
historicalSchema.set('toJSON',{
    transform:(doc,returnObj) => {
      returnObj.id = returnObj._id.toString()
      delete returnObj._id
      delete returnObj.__v
    }
  })
const Historical = mongoose.model('Historical',historicalSchema)

module.exports = Historical