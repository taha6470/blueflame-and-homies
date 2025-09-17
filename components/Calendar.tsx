import React, { useState, useMemo } from 'react';

interface CalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  workoutDays: string[]; // Dates in "YYYY-MM-DD" format
}

const ChevronLeft: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRight: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);

export const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange, workoutDays }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }, [currentMonth]);

  const firstDayOfMonth = currentMonth.getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const formatDateKey = (date: Date): string => date.toISOString().split('T')[0];

  const workoutDaysSet = useMemo(() => new Set(workoutDays), [workoutDays]);

  return (
    <section id="calendar" className="bg-bf-gray-primary p-6 rounded-lg shadow-xl max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-bf-blue">Workout Calendar</h2>
      <div className="bg-bf-gray-secondary p-4 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-bf-gray-primary">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="text-lg font-semibold w-32 text-center">
            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h3>
          <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-bf-gray-primary">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-xs text-gray-400 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day}>{day}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}
          {daysInMonth.map(day => {
            const isSelected = formatDateKey(day) === formatDateKey(selectedDate);
            const hasWorkout = workoutDaysSet.has(formatDateKey(day));
            
            let dayClasses = "w-10 h-10 flex items-center justify-center rounded-full text-sm cursor-pointer transition-colors duration-200 ";
            if (isSelected) {
              dayClasses += "bg-bf-blue text-white font-bold ";
            } else if (hasWorkout) {
              dayClasses += "bg-green-900 text-green-300 hover:bg-green-800 ";
            } else {
              dayClasses += "hover:bg-bf-gray-primary ";
            }

            return (
              <div key={day.toString()} className={dayClasses} onClick={() => onDateChange(day)}>
                {day.getDate()}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
