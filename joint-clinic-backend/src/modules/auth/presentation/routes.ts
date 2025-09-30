// path: src/modules/auth/presentation/routes.ts
import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { requestOtp, verifyOtp } from './controllers/auth.controller.js';

export const authRoutes = Router();

const requestLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false
});

const verifyLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false
});

authRoutes.post('/otp/request', requestLimiter, requestOtp);
authRoutes.post('/otp/verify', verifyLimiter, verifyOtp);
