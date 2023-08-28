const Stock = require('../models/stock')

const getAllMedicines = ()=>{
 const allMedicines = Stock.find({}).populate({
    path:'Stock',
    match: {tipo: 'Medicines'}
 })
 return allMedicines
}