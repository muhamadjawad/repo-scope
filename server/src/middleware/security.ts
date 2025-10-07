import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { validationResult } from 'express-validator';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';

// Rate limiting configuration
export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// GitHub API specific rate limiter
export const githubLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 hour
    max: 30, // Limit each IP to 30 GitHub API requests per hour
    message: 'GitHub API rate limit exceeded, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Input validation middleware
export const validateInput = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            errors: errors.array()
        });
    }
    next();
};

// CORS configuration
export const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173' || 'http ://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400, // 24 hours
};

// Security middleware configuration
export const securityMiddleware = [
    helmet(), // Secure headers
    cors(corsOptions), // CORS
    limiter, // Rate limiting
];
