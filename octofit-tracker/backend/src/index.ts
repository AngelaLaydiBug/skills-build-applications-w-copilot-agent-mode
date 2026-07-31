import express from 'express';
import cors from 'cors';
import db from './config/database.ts';
import userRouter from './routes/users.ts';
import teamRouter from './routes/teams.ts';
import activityRouter from './routes/activities.ts';
import workoutRouter from './routes/workouts.ts';
import leaderboardRouter from './routes/leaderboard.ts';

const app = express();
const PORT = Number(process.env.PORT ?? 8000);

app.use(cors());
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
