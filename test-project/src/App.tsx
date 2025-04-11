import React from 'react';
import { DarkModeProvider, DarkModeToggle } from '@yourusername/react-darkmode';
import { Abc } from './abc';

function App() {
  return (
    <DarkModeProvider>
      <div className="min-h-screen p-8">
        <DarkModeToggle className="mb-4" />
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Dark Mode Library Test</h1>
          
          <div className="grid gap-6">
            {/* Regular card that adapts to dark mode */}
            <div className="p-6 rounded-lg border">
              <h2 className="text-2xl font-semibold mb-4">Auto-adapting Card</h2>
              <p>This card automatically switches between light and dark mode.</p>
            </div>
            <Abc/>

            {/* Custom styled card that keeps its colors */}
            <div className="p-6 rounded-lg no-dark-mode bg-purple-100">
              <h2 className="text-2xl font-semibold mb-4 text-purple-900">Custom Styled Card</h2>
              <p className="text-purple-800">This card maintains its purple theme in both modes!</p>
            </div>

            {/* Buttons showcase */}
            <div className="flex gap-4">
              <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                Auto-adapting Button
              </button>
              <button className="px-4 py-2 rounded-lg no-dark-mode bg-orange-500 text-white hover:bg-orange-600">
                Custom Styled Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </DarkModeProvider>
  );
}

export default App;