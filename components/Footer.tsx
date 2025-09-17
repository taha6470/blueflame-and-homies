
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-bf-gray-primary mt-8 py-6">
      <div className="container mx-auto text-center text-gray-500">
        &copy; {new Date().getFullYear()} blueflame and homies
      </div>
    </footer>
  );
};
