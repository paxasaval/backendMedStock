const mongoose = require("mongoose");

const historicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  site: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});
historicSchema.set('toJSON',{
  transform:(doc,returnObj) => {
    returnObj.id = returnObj._id.toString()
    delete returnObj._id
    delete returnObj.__v
  }
})
const Historic = mongoose.model('Historic',historicSchema)
module.exports = Historic
