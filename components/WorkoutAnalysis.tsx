
import React from 'react';

interface WorkoutAnalysisProps {
  analysis: string;
  isLoading: boolean;
  error: string | null;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-bf-blue"></div>
      <p className="text-xl text-gray-300">Blueflame is analyzing your performance...</p>
    </div>
);


// A simple markdown-to-HTML parser for the analysis text.
const SimpleMarkdown: React.FC<{ text: string }> = ({ text }) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    
    return (
        <div className="prose prose-invert prose-lg max-w-none">
            {lines.map((line, index) => {
                if (line.startsWith('### ')) return <h3 key={index} className="text-xl font-semibold mt-4 mb-2">{line.substring(4)}</h3>;
                if (line.startsWith('## ')) return <h2 key={index} className="text-2xl font-bold mt-6 mb-3 text-bf-blue">{line.substring(3)}</h2>;
                if (line.startsWith('# ')) return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>;
                if (line.startsWith('* ')) return <li key={index} className="ml-5">{line.substring(2)}</li>;
                if (/^\d+\.\s/.test(line)) return <li key={index} className="ml-5">{line.substring(line.indexOf(' ') + 1)}</li>
                return <p key={index} className="mb-4">{line}</p>;
            })}
        </div>
    )
}

export const WorkoutAnalysis: React.FC<WorkoutAnalysisProps> = ({ analysis, isLoading, error }) => {
  return (
    <section id="workout-analysis" className="bg-bf-gray-primary p-6 rounded-lg shadow-xl max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-bf-blue">Workout Analysis</h2>
      <div className="bg-bf-gray-secondary p-6 rounded-md min-h-[20rem] flex items-center justify-center">
        {isLoading && <LoadingSpinner />}
        {error && <p className="text-red-400 text-lg text-center">{error}</p>}
        {!isLoading && !error && analysis && (
          <SimpleMarkdown text={analysis} />
        )}
         {!isLoading && !error && !analysis && (
            <p className="text-center text-gray-400">Log a workout to see your AI-powered analysis.</p>
         )}
      </div>
    </section>
  );
};
