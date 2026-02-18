
import express from 'express'
import authRoute from './routes/auth/authRoute.js'
import pipeStockRoute from './routes/stock/pipeStockRoute.js'

const app = express()

//middleware
app.use(express.json())

//auth route for login and register
app.use('/api/auth', authRoute)

//pipe product routes
app.use('/api/stock', pipeStockRoute)

export default app