
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


const SimpleMarkdown: React.FC<{ text: string }> = ({ text }) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    
    let listItems: string[] = [];
    let listType: 'ul' | 'ol' | null = null;

    const flushList = () => {
        if (listItems.length === 0) return;
        
        if (listType === 'ul') {
            elements.push(
                <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-1 my-4">
                    {listItems.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            );
        } else if (listType === 'ol') {
            elements.push(
                <ol key={`list-${elements.length}`} className="list-decimal list-inside space-y-1 my-4">
                    {listItems.map((item, index) => <li key={index}>{item}</li>)}
                </ol>
            );
        }
        listItems = [];
        listType = null;
    };

    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        if (trimmedLine === '') {
            flushList();
            return;
        }

        if (line.startsWith('### ')) {
            flushList();
            elements.push(<h3 key={index} className="text-xl font-semibold mt-4 mb-2">{line.substring(4)}</h3>);
        } else if (line.startsWith('## ')) {
            flushList();
            elements.push(<h2 key={index} className="text-2xl font-bold mt-6 mb-3 text-bf-blue">{line.substring(3)}</h2>);
        } else if (line.startsWith('# ')) {
            flushList();
            elements.push(<h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>);
        } else if (line.startsWith('* ')) {
            if (listType !== 'ul') {
                flushList();
                listType = 'ul';
            }
            listItems.push(line.substring(2));
        } else if (/^\d+\.\s/.test(line)) {
            if (listType !== 'ol') {
                flushList();
                listType = 'ol';
            }
            listItems.push(line.substring(line.indexOf(' ') + 1));
        } else {
            flushList();
            elements.push(<p key={index} className="mb-4">{line}</p>);
        }
    });

    flushList(); 

    return (
        <div className="prose prose-invert prose-lg max-w-none">
            {elements}
        </div>
    );
};

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
