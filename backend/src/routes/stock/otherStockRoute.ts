import express from 'express'
import isLoggedIn from '../../middlewares/isLoggedIn.js'
import otherStockController from '../../controllers/stock/otherStockController.js'

const router = express.Router()

router.route('/other-product').get(isLoggedIn, otherStockController.showAllOtherProduct).post(isLoggedIn, otherStockController.addOtherProduct)
router.route('/other-product/:id').delete(isLoggedIn,otherStockController.deleteOtherProduct).get(isLoggedIn,otherStockController.singleOtherProduct).patch(isLoggedIn, otherStockController.updateOtherProduct)


export default router