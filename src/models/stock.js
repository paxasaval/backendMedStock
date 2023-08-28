const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    supplier: {
      type: String,
      required: true,   
    },
    quantity: {
      type: Number,
      required: true,
    },
    registrationDate:{
        type: Date,
        required: true,
    },
    inventory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Inventory',
        required:true
    }
  },
  {
    discriminatorKey: "type",
  }
);

stockSchema.set('toJSON',{
    transform:(doc,returnObj) => {
      if(returnObj._id){
        returnObj.id = returnObj._id.toString()
        delete returnObj._id
        delete returnObj.__v
      }
    }
  })

const Stock = mongoose.model('Stock',stockSchema)
module.exports = Stock
