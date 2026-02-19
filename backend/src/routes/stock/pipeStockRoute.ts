import express from 'express'
import isLoggedIn from '../../middlewares/isLoggedIn.js'
import pipeStockController from '../../controllers/stock/pipeStockController.js'

const router = express.Router()

router.route('/pipe-product').get(isLoggedIn, pipeStockController.showAllPipeProduct).post(isLoggedIn, pipeStockController.addPipeProduct)
router.route('/pipe-product/:id').delete(isLoggedIn,pipeStockController.deletePipeProduct).get(isLoggedIn,pipeStockController.singlePipeProduct).patch(isLoggedIn, pipeStockController.updatePipeProduct)


export default router