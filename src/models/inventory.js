const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    stock:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Stock',
        required:false
    }]
  }
);
const Inventory = mongoose.model('Inventory',inventorySchema)
module.exports = Inventory
