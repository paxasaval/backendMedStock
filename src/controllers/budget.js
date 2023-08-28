const Budget = require('../models/budget')

const budgetRoute = require('express').Router()

budgetRoute.get('/all',async(req,res,next)=>{
    try {
        const budgetBD = await Budget.find({})
    } catch (error) {
        next(error)
    }
})
budgetRoute.get('/:period/total',async(req,res,next)=>{
    try {
        const period = req.params.period
        const budgetBD = await Budget.find({period})
        let totalBudget = 0;    
        for (const budget of budgetBD) {
            totalBudget += budget.amount; // Suma los montos de los presupuestos
        }
        res.status(200).json({ totalBudget });
    } catch (error) {       
        next(error)
    }
})

budgetRoute.post('/',async(req,res,next)=>{
    try{
        const body = req.body
        if(body.period==undefined){
            return res.status(400).json({error:'period missing'})
        }
        const newBudget = new Budget({
            amount: Number(body.amount),
            period: body.period,
            reason: body.reason
        })
        const budgetSave = await newBudget.save()
        res.status(200).json(budgetSave)
    }catch(error){
        next(error)
    }   
})
module.exports = budgetRoute
