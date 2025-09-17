
import React, { useState } from 'react';
import type { ExerciseData, MuscleGroup } from '../types';
import { PlusIcon } from './icons/PlusIcon';

interface ExerciseLibraryProps {
  exercises: ExerciseData;
  onAddExercise: (exerciseName: string) => void;
}

export const ExerciseLibrary: React.FC<ExerciseLibraryProps> = ({ exercises, onAddExercise }) => {
  const muscleGroups = Object.keys(exercises) as MuscleGroup[];
  const [activeTab, setActiveTab] = useState<MuscleGroup>(muscleGroups[0]);

  return (
    <section id="exercises" className="bg-bf-gray-primary p-6 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-bf-blue">Exercise Library</h2>
      <div className="mb-6">
        <div className="border-b border-gray-700">
          <nav className="-mb-px flex space-x-2 sm:space-x-4 overflow-x-auto pb-1" aria-label="Tabs">
            {muscleGroups.map((group) => (
              <button
                key={group}
                onClick={() => setActiveTab(group)}
                className={`whitespace-nowrap flex-shrink-0 py-3 px-2 sm:px-4 border-b-2 font-medium text-sm sm:text-base transition-colors duration-200 ${
                  activeTab === group
                    ? 'border-bf-blue text-bf-blue'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                }`}
              >
                {group}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div>
        {muscleGroups.map((group) => (
          <div key={group} className={activeTab === group ? 'block' : 'hidden'}>
            <ul className="space-y-3">
              {exercises[group].map((exercise) => (
                <li key={exercise.name} className="flex justify-between items-center bg-bf-gray-secondary p-4 rounded-md">
                  <span className="text-lg font-medium">{exercise.name}</span>
                  <button
                    onClick={() => onAddExercise(exercise.name)}
                    className="flex items-center justify-center bg-bf-blue text-white w-8 h-8 rounded-full hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bf-gray-secondary focus:ring-bf-blue"
                    aria-label={`Add ${exercise.name} to workout`}
                  >
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
