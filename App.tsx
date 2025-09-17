import React, { useState, useEffect } from 'react';
import type { View, WorkoutItem, User } from './types';
import { EXERCISE_DATA } from './constants';
import { Header } from './components/Header';
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { MyWorkout } from './components/MyWorkout';
import { Leaderboard } from './components/Leaderboard';
import { OneRepMaxCalculator } from './components/OneRepMaxCalculator';
import { Footer } from './components/Footer';
import { Auth } from './components/Auth';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('exercises');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [authError, setAuthError] = useState<string | null>(null);

  // Load users and leaderboard from localStorage on initial render
  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem('blueflameUsers');
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
      const storedLeaderboard = localStorage.getItem('blueflameLeaderboard');
      if(storedLeaderboard) {
        setLeaderboard(JSON.parse(storedLeaderboard));
      }

      const loggedInUserEmail = localStorage.getItem('blueflameCurrentUserEmail');
      if (loggedInUserEmail && storedUsers) {
        const allUsers = JSON.parse(storedUsers);
        const user = Object.values(allUsers).find((u: any) => u.email === loggedInUserEmail);
        if (user) {
          setCurrentUser(user as User);
        }
      }
    } catch (error) {
      console.error("Failed to parse data from localStorage", error);
    }
  }, []);
  
  // Helper to format date as YYYY-MM-DD
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const updateCurrentUserStateAndStorage = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    const updatedUsers = { ...users, [updatedUser.email]: updatedUser };
    setUsers(updatedUsers);
    localStorage.setItem('blueflameUsers', JSON.stringify(updatedUsers));
  }

  const handleAddExercise = (exerciseName: string) => {
    if (!currentUser) {
        setActiveView('auth');
        return;
    }
    const dateKey = formatDate(selectedDate);
    const newWorkout: WorkoutItem = { id: Date.now(), name: exerciseName, weight: 0, reps: 0 };
    
    const updatedUser = { ...currentUser };
    const dayWorkout = updatedUser.workouts[dateKey] || [];
    if (!dayWorkout.some(item => item.name === exerciseName)) {
        updatedUser.workouts[dateKey] = [...dayWorkout, newWorkout];
        updateCurrentUserStateAndStorage(updatedUser);
    }
    setActiveView('my-workout');
  };

  const handleUpdateWorkout = (id: number, field: 'weight' | 'reps', value: number) => {
    if (!currentUser) return;
    const dateKey = formatDate(selectedDate);
    
    const updatedUser = { ...currentUser };
    const dayWorkout = (updatedUser.workouts[dateKey] || []).map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    updatedUser.workouts[dateKey] = dayWorkout;
    setCurrentUser(updatedUser); // Update state for immediate UI response
  };

  const handleRemoveExercise = (id: number) => {
    if (!currentUser) return;
    const dateKey = formatDate(selectedDate);

    const updatedUser = { ...currentUser };
    updatedUser.workouts[dateKey] = (updatedUser.workouts[dateKey] || []).filter(item => item.id !== id);
    updateCurrentUserStateAndStorage(updatedUser);
  };
  
  const handleLogWorkout = () => {
    if (!currentUser) return;
    // Persist final state of the day's workout
    updateCurrentUserStateAndStorage(currentUser);
    
    // Update leaderboard
    const dateKey = formatDate(selectedDate);
    const todaysWorkout = currentUser.workouts[dateKey] || [];
    let leaderboardUpdated = false;
    const newLeaderboard = [...leaderboard];

    todaysWorkout.forEach(item => {
      const existingEntryIndex = newLeaderboard.findIndex(
        e => e.exercise === item.name
      );
      if (existingEntryIndex > -1) {
        if (item.weight > newLeaderboard[existingEntryIndex].weight) {
          newLeaderboard[existingEntryIndex] = { exercise: item.name, user: currentUser.username, weight: item.weight };
          leaderboardUpdated = true;
        }
      } else {
        newLeaderboard.push({ exercise: item.name, user: currentUser.username, weight: item.weight });
        leaderboardUpdated = true;
      }
    });

    if(leaderboardUpdated) {
      setLeaderboard(newLeaderboard);
      localStorage.setItem('blueflameLeaderboard', JSON.stringify(newLeaderboard));
    }
    
    alert('Workout Logged!');
    setActiveView('exercises');
  };

  const findPreviousPerformance = (exerciseName: string): { weight: number, reps: number } | null => {
    if (!currentUser) return null;

    const sortedDates = Object.keys(currentUser.workouts).sort().reverse();
    const today = formatDate(selectedDate);

    for (const date of sortedDates) {
      if(date >= today) continue; // Don't look at today's or future workouts
      const workout = currentUser.workouts[date];
      const exercise = workout.find(item => item.name === exerciseName);
      if (exercise) {
        return { weight: exercise.weight, reps: exercise.reps };
      }
    }
    return null;
  };

  const handleLogin = (credentials: {email: string, password: string}) => {
    const user = users[credentials.email];
    // Mock password check
    if (user) {
        setCurrentUser(user);
        localStorage.setItem('blueflameCurrentUserEmail', user.email);
        setActiveView('exercises');
        setAuthError(null);
    } else {
        setAuthError('Invalid credentials.');
    }
  };

  const handleRegister = (credentials: {email: string, password: string, username: string}) => {
     if (users[credentials.email]) {
         setAuthError('An account with this email already exists.');
         return;
     }
     if (Object.values(users).some(u => u.username === credentials.username)) {
        setAuthError('This username is already taken.');
        return;
     }
     
     const newUser: User = { 
       id: Date.now().toString(), 
       email: credentials.email, 
       username: credentials.username,
       workouts: {}
     };
     
     const updatedUsers = { ...users, [newUser.email]: newUser };
     setUsers(updatedUsers);
     localStorage.setItem('blueflameUsers', JSON.stringify(updatedUsers));
     
     setCurrentUser(newUser);
     localStorage.setItem('blueflameCurrentUserEmail', newUser.email);

     setActiveView('exercises');
     setAuthError(null);
  };

  const handleLogout = () => {
    if(currentUser) {
        // Final save before logging out
        updateCurrentUserStateAndStorage(currentUser);
    }
    setCurrentUser(null);
    localStorage.removeItem('blueflameCurrentUserEmail');
    setActiveView('exercises');
  };

  const renderActiveView = () => {
    if (!currentUser && activeView === 'my-workout') {
        return <Auth onLogin={handleLogin} onRegister={handleRegister} authError={authError} setAuthError={setAuthError} />;
    }

    switch (activeView) {
      case 'exercises':
        return <ExerciseLibrary exercises={EXERCISE_DATA} onAddExercise={handleAddExercise} />;
      case 'my-workout':
        return (
          <MyWorkout
            workout={currentUser?.workouts[formatDate(selectedDate)] || []}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            workoutDays={currentUser ? Object.keys(currentUser.workouts) : []}
            onUpdateWorkout={handleUpdateWorkout}
            onRemoveExercise={handleRemoveExercise}
            onLogWorkout={handleLogWorkout}
            findPreviousPerformance={findPreviousPerformance}
          />
        );
      case 'leaderboard':
        return <Leaderboard data={leaderboard} />;
      case 'calculator':
        return <OneRepMaxCalculator />;
      case 'auth':
          return <Auth onLogin={handleLogin} onRegister={handleRegister} authError={authError} setAuthError={setAuthError} />;
      default:
        return <ExerciseLibrary exercises={EXERCISE_DATA} onAddExercise={handleAddExercise} />;
    }
  };

  return (
    <div className="bg-bf-gray-secondary min-h-screen text-bf-text font-sans">
      <Header 
        activeView={activeView} 
        setActiveView={setActiveView} 
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {renderActiveView()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
