
import express from 'express'
import authRoute from './routes/auth/authRoute.js'
import pipeStockRoute from './routes/stock/pipeStockRoute.js'
import colorStockRoute from './routes/stock/colorStockRoute.js'
import sanitaryStockRoute from './routes/stock/sanitaryStockRoute.js'
import otherStockRoute from './routes/stock/otherStockRoute.js'

const app = express()

//middleware
app.use(express.json())

//auth route for login and register
app.use('/api/auth', authRoute)

//pipe product routes
app.use('/api/stock', pipeStockRoute)

//color product routes
app.use('/api/stock',colorStockRoute)

//sanitary product routes
app.use('/api/stock',sanitaryStockRoute)

//sanitary product routes
app.use('/api/stock',otherStockRoute)

export default app