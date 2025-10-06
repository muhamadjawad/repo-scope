import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Test route to verify server is running
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Server is running successfully! 🚀' });
});

// Start the server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});