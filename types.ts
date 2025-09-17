export type MuscleGroup = 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core';

export interface Exercise {
  name: string;
}

export type ExerciseData = Record<MuscleGroup, Exercise[]>;

export interface WorkoutItem {
  id: number;
  name: string;
  weight: number;
  reps: number;
}

export interface User {
    id: string;
    username: string;
    email: string;
    workouts: { [date: string]: WorkoutItem[] }; // e.g. { "2024-07-31": [workoutItem1, ...] }
}

export interface LeaderboardEntry {
  exercise: string;
  user: string;
  weight: number;
}

export type View = 'exercises' | 'my-workout' | 'leaderboard' | 'calculator' | 'auth';

export interface WorkoutSession {
    id: string;
    userId: string;
    date: string; // YYYY-MM-DD
    items: WorkoutItem[];
}
