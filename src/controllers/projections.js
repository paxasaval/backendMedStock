const Projections = require('../models/projections')

const projectionsRoute =  require('express').Router()

projectionsRoute.get('/all',async(req,res,next)=>{
    try {
        const projectionsBD = await Projections.find({})
        res.status(200).json(projectionsBD)
    } catch (error) {
        next(error)
    }
})
projectionsRoute.get('/periods',async(req,res,next)=>{
    try {
        const projectionsBD = await Projections.find({})
        const uniquePeriods = new Set();
        // Identificar valores únicos de 'period' y agregarlos al conjunto
        projectionsBD.forEach((projection) => {
            uniquePeriods.add(projection.period);
        });
        // Convertir el conjunto a un array para enviarlo como respuesta
        const periodsArray = Array.from(uniquePeriods);
        // Devolver los valores únicos de 'period' como respuesta
        res.json({ periods: periodsArray });
    } catch (error) {
        
    }
})
projectionsRoute.get('/:period/all',async(req,res,next)=>{
    try {
        const period = req.params.period
        const projectionsBD = await Projections.find({period:period})
        res.status(200).json(projectionsBD);
    } catch (error) {
        next(error)
    }
})

projectionsRoute.post('/',async(req,res,next)=>{
    try {
        const body = req.body
        if(body.code === undefined){    
            return res.status(400).json({error:'code missing'})
        }
        const newProjection = new Projections({
            code:body.code,
            period:body.period,
            site:body.site, 
            quantity:Number(body.quantity),
            state: 0
        })
        const projectionSave = await newProjection.save()
        console.log(projectionSave)
        const projectionsBD = await Projections.find({period:body.period})
        res.status(200).json({state:true,result:projectionsBD})
    } catch (error) {   
        next(error)
    }
})
module.exports=projectionsRoute 