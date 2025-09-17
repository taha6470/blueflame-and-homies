
import React from 'react';
import type { LeaderboardEntry } from '../types';

interface LeaderboardProps {
  data: LeaderboardEntry[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
  return (
    <section id="leaderboard" className="bg-bf-gray-primary p-6 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-bf-blue">Top Lifts</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead className="bg-bf-gray-secondary text-gray-300 uppercase tracking-wider">
            <tr>
              <th className="p-4">Exercise</th>
              <th className="p-4">User</th>
              <th className="p-4 text-right">Max Weight (kg)</th>
            </tr>
          </thead>
          <tbody id="leaderboard-body">
            {data.map((entry, index) => (
              <tr key={`${entry.exercise}-${entry.user}`} className="border-b border-gray-700 hover:bg-bf-gray-secondary">
                <td className="p-4 font-medium">{entry.exercise}</td>
                <td className="p-4">{entry.user}</td>
                <td className="p-4 text-right font-semibold text-bf-blue">{entry.weight} kg</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
