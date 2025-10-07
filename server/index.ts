import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import authRoutes from './src/routes/auth';
import githubRoutes from './src/routes/github';
import initializeDb from './src/db'; // ✅ fixed path
import { securityMiddleware, githubLimiter } from './src/middleware/security';

const app = express();
const port = process.env.PORT || 3000;

async function startServer() {
    try {
        await initializeDb();
        console.log('✅ Database initialized');

        // Apply security middleware
        app.use(securityMiddleware);

        // Body parser middleware
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        // Apply routes with specific rate limiters
        app.use('/api/auth', authRoutes);
        app.use('/api/github', githubLimiter, githubRoutes);

        app.get('/', (req, res) => {
            res.json({ message: 'Server is running successfully! 🚀' });
        });

        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
