import express from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry.ts';

const router = express.Router();

router.get('/', async (req, res) => {
  const entries = await LeaderboardEntry.find().populate('user team').sort({ score: -1, rank: 1 });
  res.json(entries);
});

router.post('/', async (req, res) => {
  const entry = new LeaderboardEntry(req.body);
  await entry.save();
  res.status(201).json(entry);
});

router.get('/:id', async (req, res) => {
  const entry = await LeaderboardEntry.findById(req.params.id).populate('user team');
  if (!entry) return res.status(404).json({ error: 'Leaderboard entry not found' });
  res.json(entry);
});

router.put('/:id', async (req, res) => {
  const entry = await LeaderboardEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!entry) return res.status(404).json({ error: 'Leaderboard entry not found' });
  res.json(entry);
});

router.delete('/:id', async (req, res) => {
  const entry = await LeaderboardEntry.findByIdAndDelete(req.params.id);
  if (!entry) return res.status(404).json({ error: 'Leaderboard entry not found' });
  res.status(204).end();
});

export default router;
