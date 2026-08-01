/**
 * Seed the octofit_db database with test data
 */
import mongoose from 'mongoose';
import User from '../models/User.ts';
import Team from '../models/Team.ts';
import Activity from '../models/Activity.ts';
import Workout from '../models/Workout.ts';
import LeaderboardEntry from '../models/LeaderboardEntry.ts';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function clearDatabase() {
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
  ]);
}

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await clearDatabase();

    const users = await User.create([
      { name: 'Alicia', email: 'alicia@example.com', role: 'user' },
      { name: 'Bruno', email: 'bruno@example.com', role: 'user' },
      { name: 'Carla', email: 'carla@example.com', role: 'coach' },
    ]);

    const teams = await Team.create([
      { name: 'Marlin Runners', description: 'Team for morning cardio', members: [users[0]._id, users[1]._id] },
      { name: 'Iron Octos', description: 'Strength and endurance team', members: [users[2]._id] },
    ]);

    const workouts = await Workout.create([
      {
        name: 'Circuit Burn',
        description: 'Full-body circuit training',
        difficulty: 'hard',
        durationMinutes: 45,
        exercises: ['burpees', 'push-ups', 'jump squats', 'plank'],
      },
      {
        name: 'Recovery Flow',
        description: 'Low impact mobility and stretching',
        difficulty: 'easy',
        durationMinutes: 30,
        exercises: ['cat-cow', 'hip circles', 'child pose', 'deep squat'],
      },
    ]);

    await Activity.create([
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'running',
        durationMinutes: 35,
        caloriesBurned: 320,
        date: new Date(),
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        type: 'cycling',
        durationMinutes: 50,
        caloriesBurned: 450,
        date: new Date(),
      },
    ]);

    await LeaderboardEntry.create([
      { user: users[0]._id, team: teams[0]._id, score: 980, rank: 1 },
      { user: users[1]._id, team: teams[0]._id, score: 870, rank: 2 },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
