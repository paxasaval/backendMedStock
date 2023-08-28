const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
    start: {
        type: String,
        required: true,
      },
      finish: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
      cost: {
        type: Number,
        required: true,
      },
})
const Route = mongoose.model('Route',routeSchema)
module.exports = Route