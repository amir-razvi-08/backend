import Router from "express";
import express from "express";
import cors from "cors";
import { registerUser, loginUser, logoutUser,verifyOtp, resetPassword } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.use(
    cors({
        origin: process.env.CORS_ORIGIN, // Allow frontend origin
        credentials: true,
        methods: ["POST", "OPTIONS"], // Allow POST and OPTIONS
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

router.options("/generate-otp", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.sendStatus(200);
});

router.post("/generate-otp", generateOtp);


const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT,logoutUser);
router.route('/verify-otp').post(verifyOtp);
router.route('/reset-password').post(resetPassword);






export default router;
