
import type { ExerciseData, LeaderboardEntry } from './types';

export const EXERCISES: ExerciseData = {
  Chest: [
    { name: 'Barbell Bench Press' },
    { name: 'Incline Dumbbell Press' },
    { name: 'Decline Bench Press' },
    { name: 'Cable Crossovers' },
    { name: 'Push-ups' },
  ],
  Back: [
    { name: 'Deadlifts' },
    { name: 'Pull-ups' },
    { name: 'Bent-over Rows' },
    { name: 'Lat Pulldowns' },
    { name: 'T-Bar Rows' },
  ],
  Biceps: [
    { name: 'Barbell Curls' },
    { name: 'Dumbbell Curls' },
    { name: 'Hammer Curls' },
    { name: 'Preacher Curls' },
    { name: 'Concentration Curls' },
  ],
  Triceps: [
    { name: 'Close-grip Bench Press' },
    { name: 'Skull Crushers' },
    { name: 'Tricep Pushdowns' },
    { name: 'Overhead Tricep Extensions' },
    { name: 'Dips' },
  ],
  Shoulders: [
    { name: 'Overhead Press' },
    { name: 'Arnold Press' },
    { name: 'Lateral Raises' },
    { name: 'Front Raises' },
    { name: 'Upright Rows' },
  ],
  Legs: [
    { name: 'Squats' },
    { name: 'Leg Press' },
    { name: 'Lunges' },
    { name: 'Romanian Deadlifts' },
    { name: 'Calf Raises' },
  ],
};

export const INITIAL_LEADERBOARD_DATA: LeaderboardEntry[] = [
    { "exercise": "Squats", "user": "BigRon", "weight": 250 },
    { "exercise": "Deadlifts", "user": "Sara", "weight": 180 },
    { "exercise": "Barbell Bench Press", "user": "Mike", "weight": 140 },
    { "exercise": "Overhead Press", "user": "Ana", "weight": 60 },
];
