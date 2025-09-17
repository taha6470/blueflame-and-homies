
export type MuscleGroup = 'Chest' | 'Back' | 'Biceps' | 'Triceps' | 'Shoulders' | 'Legs';

export interface Exercise {
  name: string;
}

export type ExerciseData = Record<MuscleGroup, Exercise[]>;

export interface WorkoutItem {
  id: number;
  name:string;
  weight: string;
  reps: string;
}

export interface LeaderboardEntry {
  exercise: string;
  user: string;
  weight: number;
}

export type View = 'exercises' | 'my-workout' | 'leaderboard' | 'calculator' | 'analysis';
