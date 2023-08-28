const inventoryRoute = require('express').Router()
const Inventory = require('../models/inventory')
const Medicine = require('../models/medicines')
const { default: mongoose } = require('mongoose')
const Supplies = require('../models/supplies')
const Device = require('../models/device')

inventoryRoute.get('/all',async (req,res,next)=>{
    try {
        const inventoryDB = await Inventory.find({}).populate('stock')
        res.status(200).json(inventoryDB)
    } catch (error) {
        next(error)
    }
})
inventoryRoute.get('/all/medicines',async (req,res,next)=>{
    try {
        const inventoryDB = await Inventory.find({}).populate({
            path:'stock',
            match:{type:'Medicines'},
            options:{limit:10}
        })    
        res.status(200).json(inventoryDB[0].stock)
    } catch (error) {
        next(error)
    }
})
inventoryRoute.get('/all/supplies',async (req,res,next)=>{
    try {
        const inventoryDB = await Inventory.find({}).populate({
            path:'stock',
            match:{type:'Supplies'},
            options:{limit:10}
        })    
        res.status(200).json(inventoryDB[0].stock)
    } catch (error) {
        next(error)
    }
})
inventoryRoute.get('/all/device',async (req,res,next)=>{
    try {
        const inventoryDB = await Inventory.find({}).populate({
            path:'stock',
            match:{type:'Device'},
            options:{limit:10}
        })    
        res.status(200).json(inventoryDB[0].stock)
    } catch (error) {
        next(error)
    }
})
inventoryRoute.post('/',async(req,res,next)=>{
    try {
        const body = req.body
        if(body.code === undefined){    
            return res.status(400).json({error:'code missing'})
        }
        if(body.location === undefined){
            return res.status(400).json({error:'location missing'})
        }
        const newInventory =  new Inventory({
            code:body.code,
            location: body.location,    
        })
            
        const InventorySave = await newInventory.save()
        res.status(200).json(InventorySave)
    } catch (error) {
        next(error) 
    }
})
inventoryRoute.post('/addMedicine',async(req,res,next)=>{
    try {
        const body = req.body
        const inventoryID = new mongoose.Types.ObjectId(body.inventory)
        if(body.code === undefined){
            return res.status(400).json({error:'code missing'})
        }
        if(inventoryID === undefined){
            return res.status(400).json({error:'inventoryID missing'})
        }
        const newMedicine =  new Medicine({
            name: body.name,
            code: body.code,
            supplier: body.supplier,
            quantity: Number(body.quantity),
            registrationDate: new Date(),
            inventory: inventoryID,
            officialName: body.officialName,
            lot: body.lot,
            dueDate: new Date(body.dueDate),
            activeIngredient: body.activeIngredient
        })                 
        const medicineSave = await newMedicine.save()
        //console.log(medicineSave)
        const inventoryDB = await Inventory.findById(inventoryID)
        const inventoryUpdate = inventoryDB
        if(inventoryDB.stock==undefined){
            inventoryUpdate.stock=[medicineSave]
        }else{
            inventoryUpdate.stock.push(medicineSave)
        }
        console.log(inventoryUpdate)  
        //inventoryUpdate.stock = inventoryDB.stock.concat(medicineSave)
        //console.log(inventoryUpdate)
        const inventoryUpdateAndSave = await Inventory.findByIdAndUpdate(inventoryID,inventoryUpdate,{new:true})
        res.status(200).json(inventoryUpdateAndSave.toJSON())
    } catch (error) {
        next(error)
    }
})
inventoryRoute.post('/addSupplies',async(req,res,next)=>{
    try {
        const body = req.body
        const inventoryID = new mongoose.Types.ObjectId(body.inventory)
        if(body.code === undefined){
            return res.status(400).json({error:'code missing'})
        }
        if(inventoryID === undefined){
            return res.status(400).json({error:'inventoryID missing'})
        }
        const newSupplies =  new Supplies({
            name: body.name,
            code: body.code,
            supplier: body.supplier,
            quantity: Number(body.quantity),
            registrationDate: new Date(),
            inventory: inventoryID,
            tag: body.tag||'S/N',
            lot: body.lot,
            dueDate: new Date(body.dueDate),
            material: body.material||'undefided'
        })                 
        const suppliesSave = await newSupplies.save()
        console.log(suppliesSave)
        const inventoryDB = await Inventory.findById(inventoryID)
        const inventoryUpdate = inventoryDB
        inventoryUpdate.stock.push(suppliesSave)
        const inventoryUpdateAndSave = await Inventory.findByIdAndUpdate(inventoryID,inventoryUpdate,{new:true})
        res.status(200).json(inventoryUpdateAndSave.toJSON())
    } catch (error) {
        next(error)
    }
})
inventoryRoute.post('/addDevice',async(req,res,next)=>{
    try {
        const body = req.body
        const inventoryID = new mongoose.Types.ObjectId(body.inventory)
        if(body.code === undefined){
            return res.status(400).json({error:'code missing'})
        }
        if(inventoryID === undefined){
            return res.status(400).json({error:'inventoryID missing'})
        }
        const newDevice =  new Device({
            name: body.name,
            code: body.code,
            supplier: body.supplier,
            quantity: Number(body.quantity),
            registrationDate: new Date(),
            inventory: inventoryID,
            model: body.model,
            weight: body.weight,
            brand:body.brand,
        })                 
        const deviceSave = await newDevice.save()
        console.log(deviceSave)
        const inventoryDB = await Inventory.findById(inventoryID)
        const inventoryUpdate = inventoryDB
        inventoryUpdate.stock.push(deviceSave)
        const inventoryUpdateAndSave = await Inventory.findByIdAndUpdate(inventoryID,inventoryUpdate,{new:true})
        res.status(200).json(inventoryUpdateAndSave.toJSON())
    } catch (error) {
        next(error)
    }
})


module.exports = inventoryRoute         