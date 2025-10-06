import express from 'express';
import authRoutes from './src/routes/auth';
import githubRoutes from './src/routes/github';
import initializeDb from './src/db'; // ✅ fixed path

const app = express();
const port = process.env.PORT || 3000;

async function startServer() {
    try {
        await initializeDb();
        console.log('✅ Database initialized');

        app.use(express.json());
        app.use('/api/auth', authRoutes);
        app.use('/api/github', githubRoutes);

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
