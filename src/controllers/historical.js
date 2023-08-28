const Historic = require("../models/historic");
const Historical = require("../models/historical");

const historicalRoute = require("express").Router();

historicalRoute.get("/all", async (req, res, next) => {
  try {
    const historicalBD = await Historical.find({}).populate("historic");
    res.status(200).json(historicalBD);
  } catch (error) {
    next(error);
  }
});
historicalRoute.get('/summary/:period',async(req,res,next)=>{
  try {
      const period = req.params.period
      const historicalBD = await Historical.findOne({period:period}).populate({
        path: "historic",
      });
      var totalMed= 0
      var totalSup= 0
      var totalDev= 0

      historicalBD.historic.forEach((historic) => {
        if(historic.type == 'Medicines'){
          totalMed += Number(historic.quantity)
        }
        if(historic.type == 'Supplies'){
          totalSup += Number(historic.quantity)
        }
        if(historic.type == 'Device'){
          totalDev += Number(historic.quantity)
        }
      }); 
      const result = historicalBD.historic[0]
      res.status(200).json({medicine:totalMed,supplies:totalSup,device:totalDev})
  } catch (error) {
      next(error)
  }
})
historicalRoute.get('/period/:period/code/:code',async(req,res,next)=>{
  try {
      const period = req.params.period
      const code = req.params.code

      const historicalBD = await Historical.findOne({period:period}).populate({
        path: "historic",
        match: { code: code }
      });
      
      res.status(200).json(historicalBD.historic)
  } catch (error) {
      next(error)
  }
})
historicalRoute.get('/period/:period/code/:code/summary',async(req,res,next)=>{
  try {
      const period = req.params.period
      const code = req.params.code

      const historicalBD = await Historical.findOne({period:period}).populate({
        path: "historic",
        match: { code: code }
      });
      var total = 0
      historicalBD.historic.forEach((historic) => {
        total += Number(historic.quantity)    
      }); 
      const result = historicalBD.historic[0]
      result.quantity=total
      res.status(200).json({code,period,quantity:total})
  } catch (error) {
      next(error)
  }
})

historicalRoute.get("/all/:period/medicine", async (req, res, next) => {
  try {
    const period = req.params.period
    const historicalBD = await Historical.find({period:period}).populate({
      path: "historic",
      match: { type: "Medicines" },
    });
    res.status(200).json(historicalBD);
  } catch (error) {
    next(error);
  }
});
historicalRoute.get("/all/:period/supplies", async (req, res, next) => {
  try {
    const period = req.params.period

    const historicalBD = await Historical.find({period:period}).populate({
      path: "historic",
      match: { type: "Supplies" },
    });
    res.status(200).json(historicalBD);
  } catch (error) {
    next(error);
  }
});
historicalRoute.get("/all/:period/device", async (req, res, next) => {
  try {
    const period = req.params.period

    const historicalBD = await Historical.find({period:period}).populate({
      path: "historic",
      match: { type: "Device" },
    });
    res.status(200).json(historicalBD);
  } catch (error) {
    next(error);
  }
});

historicalRoute.post("/addHistoric", async (req, res, next) => {
  try {
    const body = req.body;
    const period = body.period;
    if (body.code === undefined) {
      return res.status(400).json({ error: "code missing" });
    }
    if (period === undefined) {
      return res.status(400).json({ error: "period missing" });
    }
    const newHistoric = new Historic({
      name: body.name,
      code: body.code,
      site: body.site,
      quantity: Number(body.quantity),
      type: body.type,
    });
    const historicSave = await newHistoric.save();
    const historicalBD = await Historical.findOne({period:period});
    //console.log(historicalBD);
    const historicUpdate = historicalBD;
    if(historicalBD.historic== undefined){
      historicUpdate.historic=[historicSave]
    }else{
      historicalBD.historic.push(historicSave)
    }
    //console.log(inventoryUpdate)
    //  inventoryUpdate.stock = inventoryDB.stock.concat(medicineSave)
    //console.log(inventoryUpdate)
    const historicalUpdateAndSave = await Historical.findByIdAndUpdate(
      historicalBD._id,
      historicUpdate,
      { new: true }
    );
    res.status(200).json(historicalUpdateAndSave.toJSON());
  } catch (error) {
    next(error);
  }
});
historicalRoute.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const period = body.period;
    if (period === undefined) {
      return res.status(400).json({ error: "period missing" });
    }
    const newHistorical = new Historical({
      period: period,
    });
    const historicalSave = await newHistorical.save();
    res.status(200).json(historicalSave);
  } catch (error) {
    next(error);
  }
});

module.exports=historicalRoute