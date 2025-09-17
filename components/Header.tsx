
import React from 'react';
import type { View } from '../types';

interface HeaderProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavLink: React.FC<{
    view: View;
    currentView: View;
    onClick: (view: View) => void;
    children: React.ReactNode;
}> = ({ view, currentView, onClick, children }) => {
    const isActive = view === currentView;
    const activeClasses = 'text-bf-blue border-bf-blue';
    const inactiveClasses = 'text-bf-text border-transparent hover:text-bf-blue';
    
    return (
        <button
            onClick={() => onClick(view)}
            className={`px-3 py-2 text-sm md:text-base font-medium border-b-2 transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses}`}
        >
            {children}
        </button>
    );
};


export const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  return (
    <header className="sticky top-0 bg-bf-gray-primary z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-bf-blue tracking-wider">
              blueflame & homies
            </h1>
          </div>
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink view="exercises" currentView={activeView} onClick={setActiveView}>Exercises</NavLink>
              <NavLink view="my-workout" currentView={activeView} onClick={setActiveView}>My Workout</NavLink>
              <NavLink view="leaderboard" currentView={activeView} onClick={setActiveView}>Leaderboard</NavLink>
              <NavLink view="calculator" currentView={activeView} onClick={setActiveView}>1RM Calculator</NavLink>
            </div>
          </nav>
        </div>
      </div>
       {/* Mobile Nav */}
       <nav className="md:hidden bg-bf-gray-secondary">
          <div className="px-2 pt-2 pb-3 flex justify-around">
            <NavLink view="exercises" currentView={activeView} onClick={setActiveView}>Exercises</NavLink>
            <NavLink view="my-workout" currentView={activeView} onClick={setActiveView}>Workout</NavLink>
            <NavLink view="leaderboard" currentView={activeView} onClick={setActiveView}>Top Lifts</NavLink>
            <NavLink view="calculator" currentView={activeView} onClick={setActiveView}>Calc</NavLink>
          </div>
        </nav>
    </header>
  );
};
