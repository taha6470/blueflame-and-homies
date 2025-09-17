import React from 'react';
import type { WorkoutItem } from '../types';
import { TrashIcon } from './icons/TrashIcon';
import { Calendar } from './Calendar';

interface MyWorkoutProps {
  workout: WorkoutItem[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  workoutDays: string[];
  onUpdateWorkout: (id: number, field: 'weight' | 'reps', value: number) => void;
  onRemoveExercise: (id: number) => void;
  onLogWorkout: () => void;
  findPreviousPerformance: (exerciseName: string) => { weight: number, reps: number } | null;
}

export const MyWorkout: React.FC<MyWorkoutProps> = ({ 
  workout, 
  selectedDate,
  onDateChange,
  workoutDays,
  onUpdateWorkout, 
  onRemoveExercise, 
  onLogWorkout,
  findPreviousPerformance
}) => {
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <section id="my-workout" className="space-y-8">
      <Calendar 
        selectedDate={selectedDate}
        onDateChange={onDateChange}
        workoutDays={workoutDays}
      />
      <div className="bg-bf-gray-primary p-6 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-2 text-center text-bf-blue">
          Workout for {formatDate(selectedDate)}
        </h2>
        {workout.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No workout logged for this day.</p>
            <p className="text-gray-500 mt-2">Go to the Exercise Library to add some lifts!</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mt-6">
              {workout.map((item) => {
                const previous = findPreviousPerformance(item.name);
                return (
                  <div key={item.id} className="bg-bf-gray-secondary p-3 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-10 gap-2 items-center">
                      <div className="md:col-span-4">
                        <span className="text-lg font-medium">{item.name}</span>
                        {previous && (
                           <p className="text-xs text-gray-400">
                             Last: {previous.weight} kg x {previous.reps} reps
                           </p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor={`weight-${item.id}`} className="sr-only">Weight</label>
                        <input
                          type="number"
                          id={`weight-${item.id}`}
                          value={item.weight}
                          onChange={(e) => onUpdateWorkout(item.id, 'weight', parseInt(e.target.value, 10) || 0)}
                          className="w-full bg-bf-gray-primary border border-gray-600 rounded-md p-2 text-center"
                          placeholder="kg"
                        />
                      </div>
                      <div className="md:col-span-1 text-center text-gray-400">x</div>
                      <div className="md:col-span-2">
                        <label htmlFor={`reps-${item.id}`} className="sr-only">Reps</label>
                        <input
                          type="number"
                          id={`reps-${item.id}`}
                          value={item.reps}
                          onChange={(e) => onUpdateWorkout(item.id, 'reps', parseInt(e.target.value, 10) || 0)}
                          className="w-full bg-bf-gray-primary border border-gray-600 rounded-md p-2 text-center"
                          placeholder="reps"
                        />
                      </div>
                      <div className="md:col-span-1 flex justify-end">
                          <button
                              onClick={() => onRemoveExercise(item.id)}
                              className="text-red-500 hover:text-red-400 p-2 rounded-full transition-colors duration-200"
                              aria-label={`Remove ${item.name}`}
                          >
                              <TrashIcon className="w-6 h-6" />
                          </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={onLogWorkout}
                className="bg-green-600 text-white font-bold py-3 px-10 rounded-lg text-lg hover:bg-green-700 transition-colors duration-200"
              >
                Log Workout
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
