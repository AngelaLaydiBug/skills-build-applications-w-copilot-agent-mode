import express from 'express';
import db from './config/database.js';
import userRouter from './routes/users.js';
import teamRouter from './routes/teams.js';
import activityRouter from './routes/activities.js';
import workoutRouter from './routes/workouts.js';
import leaderboardRouter from './routes/leaderboard.js';

const app = express();
const PORT = Number(process.env.PORT ?? 8000);

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/teams', teamRouter);
app.use('/api/activities', activityRouter);
app.use('/api/workouts', workoutRouter);
app.use('/api/leaderboard', leaderboardRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

app.listen(PORT, () => {
  console.log(`OctoFit Tracker backend listening on port ${PORT}`);
});

export default app;
