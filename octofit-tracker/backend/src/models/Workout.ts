import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    difficulty: { type: String, default: 'medium' },
    durationMinutes: { type: Number, required: true },
    exercises: [{ type: String }],
    suggestedFor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;
