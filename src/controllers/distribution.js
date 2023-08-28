const Distribution = require('../models/distribution')
const Route = require('../models/route')

const distributionRoute = require('express').Router()

distributionRoute.get('/all',async(req,res,next)=>{
    try {
        const distributionBD = await Distribution.find({})
        res.status(200).json(distributionBD)
    } catch (error) {
        next(error)
    }
})
distributionRoute.get('/allRoutes',async(req,res,next)=>{
    try {
        const RouteBD = await Route.find({})
        res.status(200).json(RouteBD)
    } catch (error) {
        next(error)
    }
})
distributionRoute.post('/addRoute',async(req,res,next)=>{
    try {
        const body = req.body;
        const newRoute = new Route({
            start:body.start,
            finish:body.finish,
            code:body.code,
            cost:Number(body.cost)
        })
        const routeSave = await newRoute.save()
        res.status(200).json(routeSave)
    } catch (error) {
        next(error)
    }
})
distributionRoute.post('/add',async(req,res,next)=>{
    try {
        const body = req.body;
        const code = body.code
        const newDistribution = new Distribution({
            route:body.route,
            state:body.state,
            charge:body.charge
        })
        const DistributionSave = await newDistribution.save()
        res.status(200).json(DistributionSave)
    } catch (error) {
        next(error)
    }
})
module.exports = distributionRoute