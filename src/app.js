//config
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
//utils
const logger = require('./utils/logger')
const middleware = require('./middleware/requestLogger')
//BD
const mongoose = require('mongoose')
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error conecting to MongoDB:', error.message)
  })
//util2

//controllers
const inventoryRouter = require('./controllers/inventory')
const budgeteRouter = require('./controllers/budget')
const historicalRouter = require('./controllers/historical')
const projectionRouter = require('./controllers/projections')
const distributionRouter = require('./controllers/distribution')


app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(cors());
app.options('*', cors())

app.use('/api/inventory',inventoryRouter)
app.use('/api/budget',budgeteRouter)
app.use('/api/historical',historicalRouter)
app.use('/api/projection',projectionRouter)
app.use('/api/distribution',distributionRouter)




module.exports = app