"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyEmailRouter = void 0;
const express_1 = __importDefault(require("express"));
const verify_email_controller_1 = require("./verify_email.controller");
const router = express_1.default.Router();
// Verify email
router.post("/verify-email", verify_email_controller_1.VerifyEmailController.VerifyEmail);
exports.VerifyEmailRouter = router;
