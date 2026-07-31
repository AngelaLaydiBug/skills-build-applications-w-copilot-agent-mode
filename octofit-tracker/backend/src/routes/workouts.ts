import express from 'express';
import Workout from '../models/Workout.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

router.post('/', async (req, res) => {
  const workout = new Workout(req.body);
  await workout.save();
  res.status(201).json(workout);
});

router.get('/:id', async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  if (!workout) return res.status(404).json({ error: 'Workout not found' });
  res.json(workout);
});

router.put('/:id', async (req, res) => {
  const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!workout) return res.status(404).json({ error: 'Workout not found' });
  res.json(workout);
});

router.delete('/:id', async (req, res) => {
  const workout = await Workout.findByIdAndDelete(req.params.id);
  if (!workout) return res.status(404).json({ error: 'Workout not found' });
  res.status(204).end();
});

export default router;
