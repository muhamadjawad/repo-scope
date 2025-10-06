import express from 'express';
import authRoutes from './src/routes/auth';
import githubRoutes from './src/routes/github';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/github', githubRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Server is running successfully! 🚀' });
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});