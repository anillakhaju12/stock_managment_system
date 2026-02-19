import express from 'express'
import isLoggedIn from '../../middlewares/isLoggedIn.js'
import sanitaryStockController from '../../controllers/stock/sanitaryStockController.js'

const router = express.Router()

router.route('/sanitary-product').get(isLoggedIn, sanitaryStockController.showAllSanitaryProduct).post(isLoggedIn, sanitaryStockController.addSanitaryProduct)
router.route('/sanitary-product/:id').delete(isLoggedIn,sanitaryStockController.deleteSanitaryProduct).get(isLoggedIn,sanitaryStockController.singleSanitaryProduct).patch(isLoggedIn, sanitaryStockController.updateSanitaryProduct)


export default router