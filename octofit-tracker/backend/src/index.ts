import express from 'express';
import db from './config/database.js';

const app = express();
const PORT = Number(process.env.PORT ?? 8000);

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

app.listen(PORT, () => {
  console.log(`OctoFit Tracker backend listening on port ${PORT}`);
});

export default app;
