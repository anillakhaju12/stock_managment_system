import express from 'express'
import isLoggedIn from '../../middlewares/isLoggedIn.js'
import colorStockController from '../../controllers/stock/colorStockController.js'

const router = express.Router()

router.route('/color-product').get(isLoggedIn,colorStockController.showAllColorProduct).post(isLoggedIn, colorStockController.addColorProduct)

router.route('/color-product/:id').get(isLoggedIn, colorStockController.singleColorProduct).patch(isLoggedIn, colorStockController.updateColorProduct).delete(isLoggedIn, colorStockController.deleteColorProduct)


export default router