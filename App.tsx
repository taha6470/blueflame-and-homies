
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header.tsx';
import { ExerciseLibrary } from './components/ExerciseLibrary.tsx';
import { MyWorkout } from './components/MyWorkout.tsx';
import { Leaderboard } from './components/Leaderboard.tsx';
import { OneRepMaxCalculator } from './components/OneRepMaxCalculator.tsx';
import { WorkoutAnalysis } from './components/WorkoutAnalysis.tsx';
import { Footer } from './components/Footer.tsx';
import type { View, WorkoutItem, LeaderboardEntry } from './types.ts';
import { EXERCISES, INITIAL_LEADERBOARD_DATA } from './constants.ts';
import { getWorkoutAnalysis } from './services/geminiService.ts';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('exercises');
  const [workout, setWorkout] = useState<WorkoutItem[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(INITIAL_LEADERBOARD_DATA);
  
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const addExerciseToWorkout = useCallback((exerciseName: string) => {
    if (!workout.some(item => item.name === exerciseName)) {
      setWorkout(prevWorkout => [...prevWorkout, { id: Date.now(), name: exerciseName, weight: '', reps: '' }]);
    }
  }, [workout]);

  const removeExerciseFromWorkout = useCallback((id: number) => {
    setWorkout(prevWorkout => prevWorkout.filter(item => item.id !== id));
  }, []);

  const updateWorkoutItem = useCallback((id: number, field: 'weight' | 'reps', value: string) => {
    setWorkout(prevWorkout =>
      prevWorkout.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  }, []);

  const logWorkout = useCallback(async () => {
    if (workout.length === 0 || workout.some(item => !item.weight || !item.reps)) {
        alert("Please fill in weight and reps for all exercises before logging.");
        return;
    }

    setIsAnalyzing(true);
    setAnalysis('');
    setAnalysisError(null);
    setActiveView('analysis'); // Switch view to show analysis progress

    // Mock backend update for leaderboard
    const newLeaderboard = [...leaderboard];
    workout.forEach(item => {
        const weight = parseInt(item.weight, 10);
        // Ensure weight is a valid number before updating the leaderboard
        if (isNaN(weight) || weight <= 0) {
            return;
        }

        const existingEntryIndex = newLeaderboard.findIndex(entry => entry.exercise === item.name);
        if (existingEntryIndex > -1) {
            if (weight > newLeaderboard[existingEntryIndex].weight) {
                newLeaderboard[existingEntryIndex] = { ...newLeaderboard[existingEntryIndex], weight: weight };
            }
        } else {
            // For simplicity, we only auto-add a few key lifts if not present.
            if (['Squats', 'Deadlifts', 'Barbell Bench Press'].includes(item.name)) {
                newLeaderboard.push({ exercise: item.name, user: "User", weight: weight });
            }
        }
    });
    setLeaderboard(newLeaderboard.sort((a, b) => b.weight - a.weight));

    try {
        const result = await getWorkoutAnalysis(workout);
        setAnalysis(result);
    } catch (error) {
        console.error("Error getting workout analysis:", error);
        setAnalysisError("Sorry, I couldn't analyze your workout. Please try again later.");
    } finally {
        setIsAnalyzing(false);
        setWorkout([]); // Clear workout after logging
    }

  }, [workout, leaderboard]);

  const renderContent = () => {
    switch (activeView) {
      case 'exercises':
        return <ExerciseLibrary exercises={EXERCISES} onAddExercise={addExerciseToWorkout} />;
      case 'my-workout':
        return (
          <MyWorkout
            workoutItems={workout}
            onRemove={removeExerciseFromWorkout}
            onUpdate={updateWorkoutItem}
            onLogWorkout={logWorkout}
            onAddCustom={addExerciseToWorkout}
          />
        );
      case 'leaderboard':
        return <Leaderboard data={leaderboard} />;
      case 'calculator':
        return <OneRepMaxCalculator />;
      case 'analysis':
        return <WorkoutAnalysis analysis={analysis} isLoading={isAnalyzing} error={analysisError} />;
      default:
        return <ExerciseLibrary exercises={EXERCISES} onAddExercise={addExerciseToWorkout} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;