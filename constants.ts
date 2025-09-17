import type { ExerciseData, LeaderboardEntry } from './types';

export const EXERCISE_DATA: ExerciseData = {
  Chest: [
    { name: 'Bench Press' },
    { name: 'Incline Dumbbell Press' },
    { name: 'Dumbbell Flyes' },
    { name: 'Cable Flys' },
    { name: 'Push-ups' },
  ],
  Back: [
    { name: 'Deadlift' },
    { name: 'Pull-ups' },
    { name: 'Bent-over Row' },
    { name: 'Lat Pulldown' },
  ],
  Legs: [
    { name: 'Squat' },
    { name: 'Leg Press' },
    { name: 'Lunges' },
    { name: 'Leg Curls' },
  ],
  Shoulders: [
    { name: 'Overhead Press' },
    { name: 'Lateral Raises' },
    { name: 'Face Pulls' },
    { name: 'Shrugs' },
  ],
  Arms: [
    { name: 'Bicep Curls' },
    { name: 'Tricep Pushdowns' },
    { name: 'Hammer Curls' },
    { name: 'Skull Crushers' },
  ],
  Core: [
    { name: 'Plank' },
    { name: 'Crunches' },
    { name: 'Leg Raises' },
    { name: 'Russian Twists' },
  ],
};

// Initial leaderboard is now empty and will be populated by users
export const LEADERBOARD_DATA: LeaderboardEntry[] = [];
