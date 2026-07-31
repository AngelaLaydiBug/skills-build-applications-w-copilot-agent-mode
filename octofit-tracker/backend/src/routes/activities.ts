import express from 'express';
import Activity from '../models/Activity.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const activities = await Activity.find().populate('user team');
  res.json(activities);
});

router.post('/', async (req, res) => {
  const activity = new Activity(req.body);
  await activity.save();
  res.status(201).json(activity);
});

router.get('/:id', async (req, res) => {
  const activity = await Activity.findById(req.params.id).populate('user team');
  if (!activity) return res.status(404).json({ error: 'Activity not found' });
  res.json(activity);
});

router.put('/:id', async (req, res) => {
  const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!activity) return res.status(404).json({ error: 'Activity not found' });
  res.json(activity);
});

router.delete('/:id', async (req, res) => {
  const activity = await Activity.findByIdAndDelete(req.params.id);
  if (!activity) return res.status(404).json({ error: 'Activity not found' });
  res.status(204).end();
});

export default router;
