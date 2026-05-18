import express from "express";
import { VerifyEmailController } from "./verify_email.controller";
const router = express.Router();

// Verify email
router.post("/verify-email", VerifyEmailController.VerifyEmail);
router.post("/verify-otp", VerifyEmailController.VerifyOtp);

export const VerifyEmailRouter = router;
