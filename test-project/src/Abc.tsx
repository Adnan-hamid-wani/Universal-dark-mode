import React from 'react';

interface AbcProps {
  // Add any props you want to accept
  className?: string;
  children?: React.ReactNode;
}

export const Abc: React.FC<AbcProps> = ({ className, children }) => {
  return (
      <h3 className="text-xl font-semibold mb-2">Abc Component</h3>
     
  );
};