
import React, { useState } from 'react';
import type { WorkoutItem } from '../types.ts';
import { TrashIcon } from './icons/TrashIcon.tsx';

interface MyWorkoutProps {
  workoutItems: WorkoutItem[];
  onRemove: (id: number) => void;
  onUpdate: (id: number, field: 'weight' | 'reps', value: string) => void;
  onLogWorkout: () => void;
  onAddCustom: (name: string) => void;
}

const WorkoutItemComponent: React.FC<{
    item: WorkoutItem;
    onRemove: (id: number) => void;
    onUpdate: (id: number, field: 'weight' | 'reps', value: string) => void;
}> = React.memo(({ item, onRemove, onUpdate }) => {
    return (
        <div className="bg-bf-gray-secondary p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-lg font-semibold md:w-1/3">{item.name}</h3>
            <div className="flex items-center gap-4">
                <input
                    type="number"
                    placeholder="Weight (kg)"
                    value={item.weight}
                    onChange={(e) => onUpdate(item.id, 'weight', e.target.value)}
                    className="bg-bf-gray-primary border border-gray-600 rounded-md p-2 w-full text-center focus:ring-bf-blue focus:border-bf-blue"
                />
                <input
                    type="number"
                    placeholder="Reps"
                    value={item.reps}
                    onChange={(e) => onUpdate(item.id, 'reps', e.target.value)}
                    className="bg-bf-gray-primary border border-gray-600 rounded-md p-2 w-full text-center focus:ring-bf-blue focus:border-bf-blue"
                />
            </div>
            <button
                onClick={() => onRemove(item.id)}
                className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-colors duration-200 self-end md:self-center"
                aria-label={`Remove ${item.name}`}
            >
                <TrashIcon className="w-5 h-5" />
            </button>
        </div>
    );
});


export const MyWorkout: React.FC<MyWorkoutProps> = ({ workoutItems, onRemove, onUpdate, onLogWorkout, onAddCustom }) => {
    const [customExercise, setCustomExercise] = useState('');

    const handleAddCustom = () => {
        if (customExercise.trim()) {
            onAddCustom(customExercise.trim());
            setCustomExercise('');
        }
    };
    
    return (
        <section id="my-workout" className="bg-bf-gray-primary p-6 rounded-lg shadow-xl space-y-6">
            <h2 className="text-3xl font-bold text-center text-bf-blue">Today's Workout</h2>

            <div id="workout-list" className="space-y-4">
                {workoutItems.length > 0 ? (
                    workoutItems.map(item => (
                       <WorkoutItemComponent key={item.id} item={item} onRemove={onRemove} onUpdate={onUpdate} />
                    ))
                ) : (
                    <p className="text-center text-gray-400 py-8">Add exercises from the library to get started!</p>
                )}
            </div>

            <div className="pt-4 border-t border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-center">Add a Custom Exercise</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        id="custom-exercise-name"
                        value={customExercise}
                        onChange={(e) => setCustomExercise(e.target.value)}
                        placeholder="e.g., Bicep Curls"
                        className="flex-grow bg-bf-gray-secondary border border-gray-600 rounded-md p-3 focus:ring-bf-blue focus:border-bf-blue"
                    />
                    <button
                        id="add-custom-btn"
                        onClick={handleAddCustom}
                        className="bg-gray-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-gray-700 transition-colors duration-200"
                    >
                        Add Custom
                    </button>
                </div>
            </div>

            {workoutItems.length > 0 && (
                <div className="text-center pt-6">
                    <button
                        id="log-workout-btn"
                        onClick={onLogWorkout}
                        className="bg-bf-blue text-white font-bold py-3 px-12 rounded-lg text-lg hover:bg-blue-600 transition-transform duration-200 transform hover:scale-105"
                    >
                        Log Workout & Get Analysis
                    </button>
                </div>
            )}
        </section>
    );
};