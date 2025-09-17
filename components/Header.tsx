import React from 'react';
import type { View, User } from '../types';

interface HeaderProps {
  activeView: View;
  setActiveView: (view: View) => void;
  currentUser: User | null;
  onLogout: () => void;
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

export const Header: React.FC<HeaderProps> = ({ activeView, setActiveView, currentUser, onLogout }) => {
  return (
    <header className="sticky top-0 bg-bf-gray-primary z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-bf-blue tracking-wider cursor-pointer" onClick={() => setActiveView('exercises')}>
              blueflame & homies
            </h1>
          </div>
          <nav className="hidden md:flex md:items-center">
            <div className="flex items-baseline space-x-4">
              <NavLink view="exercises" currentView={activeView} onClick={setActiveView}>Exercises</NavLink>
              {currentUser && <NavLink view="my-workout" currentView={activeView} onClick={setActiveView}>My Workout</NavLink>}
              <NavLink view="leaderboard" currentView={activeView} onClick={setActiveView}>Leaderboard</NavLink>
              <NavLink view="calculator" currentView={activeView} onClick={setActiveView}>1RM Calculator</NavLink>
            </div>
            <div className="ml-6">
                {currentUser ? (
                    <div className="flex items-center space-x-3">
                        <span className="text-gray-300 text-sm font-medium hidden lg:block">{currentUser.username}</span>
                        <button onClick={onLogout} className="bg-bf-blue text-white font-semibold py-2 px-4 rounded-md text-sm hover:bg-blue-600 transition-colors duration-200">Logout</button>
                    </div>
                ) : (
                    <button onClick={() => setActiveView('auth')} className="bg-bf-blue text-white font-semibold py-2 px-4 rounded-md text-sm hover:bg-blue-600 transition-colors duration-200">Login / Register</button>
                )}
            </div>
          </nav>
          <div className="md:hidden">
            {!currentUser && <button onClick={() => setActiveView('auth')} className="bg-bf-blue text-white font-semibold py-2 px-3 rounded-md text-sm hover:bg-blue-600 transition-colors duration-200">Login</button>}
          </div>
        </div>
      </div>
       {/* Mobile Nav */}
       <nav className="md:hidden bg-bf-gray-secondary">
          <div className="px-2 pt-2 pb-3 flex justify-around">
            <NavLink view="exercises" currentView={activeView} onClick={setActiveView}>Exercises</NavLink>
            {currentUser && <NavLink view="my-workout" currentView={activeView} onClick={setActiveView}>Workout</NavLink>}
            <NavLink view="leaderboard" currentView={activeView} onClick={setActiveView}>Top Lifts</NavLink>
            <NavLink view="calculator" currentView={activeView} onClick={setActiveView}>Calc</NavLink>
          </div>
          {currentUser && (
            <div className="px-4 py-3 border-t border-gray-700 flex items-center justify-between">
              <span className="text-gray-300 text-sm font-medium truncate">{currentUser.username}</span>
              <button onClick={onLogout} className="bg-red-600 text-white font-semibold py-1 px-3 rounded-md text-xs hover:bg-red-700 transition-colors duration-200">Logout</button>
            </div>
          )}
        </nav>
    </header>
  );
};