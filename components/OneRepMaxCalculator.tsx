
import React, { useState, useCallback } from 'react';

export const OneRepMaxCalculator: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [maxResult, setMaxResult] = useState<number | null>(null);

  const calculateMax = useCallback(() => {
    const weightNum = parseFloat(weight);
    const repsNum = parseInt(reps);

    if (weightNum > 0 && repsNum > 0) {
      // Brzycki formula
      const max = weightNum / (1.0278 - 0.0278 * repsNum);
      setMaxResult(Math.round(max));
    } else {
        setMaxResult(null);
    }
  }, [weight, reps]);

  return (
    <section id="calculator" className="bg-bf-gray-primary p-6 rounded-lg shadow-xl max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-bf-blue">1-Rep Max Calculator</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="weight-lifted" className="block text-sm font-medium text-gray-300 mb-1">Weight Lifted (kg)</label>
          <input
            type="number"
            id="weight-lifted"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g., 100"
            className="w-full bg-bf-gray-secondary border border-gray-600 rounded-md p-3 focus:ring-bf-blue focus:border-bf-blue"
          />
        </div>
        <div>
          <label htmlFor="reps-performed" className="block text-sm font-medium text-gray-300 mb-1">Reps Performed</label>
          <input
            type="number"
            id="reps-performed"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            placeholder="e.g., 5"
            className="w-full bg-bf-gray-secondary border border-gray-600 rounded-md p-3 focus:ring-bf-blue focus:border-bf-blue"
          />
        </div>
        <div className="text-center pt-2">
            <button
                id="calculate-max-btn"
                onClick={calculateMax}
                className="bg-bf-blue text-white font-semibold py-3 px-8 rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
                Calculate
            </button>
        </div>
      </div>
      {maxResult !== null && (
        <div className="mt-6 text-center bg-bf-gray-secondary p-4 rounded-md">
            <p className="text-lg">Your estimated 1-Rep Max is:</p>
            <p id="max-result" className="text-4xl font-bold text-bf-blue mt-2">{maxResult} kg</p>
        </div>
      )}
    </section>
  );
};
