import express from "express";
import authController from "../../controllers/auth/authController.js";

const router = express.Router()

router.route('/register').post(authController.registerUser)
router.route('/login').post(authController.loginUser)

export default router