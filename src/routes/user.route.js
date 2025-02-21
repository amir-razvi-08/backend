import Router from "express";
import express from "express";
import cors from "cors";
import { registerUser, loginUser, logoutUser,verifyOtp, resetPassword } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.use(
    cors({
        origin: "https://luxora-shop.vercel.app",
        credentials: true,
    })
);

router.post("/generate-otp", generateOtp);


const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT,logoutUser);
router.route('/verify-otp').post(verifyOtp);
router.route('/reset-password').post(resetPassword);
router.route('/generate-otp').post(generateOtp);






export default router;
