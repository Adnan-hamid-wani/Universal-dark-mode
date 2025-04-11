import React from 'react';
import { DarkModeProvider, DarkModeToggle } from './index';

function App() {
  return (
    <DarkModeProvider>
      <div className="min-h-screen p-8">
        <DarkModeToggle className="mb-4" />
        
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">Dark Mode Demo</h1>
            <p className="text-lg mb-8">This text will automatically adapt to dark mode</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-3">Auto-adapting Card</h2>
              <p>This card will automatically switch between light and dark mode</p>
            </div>

            <div className="p-6 rounded-lg border no-dark-mode bg-blue-100">
              <h2 className="text-xl font-semibold mb-3">Custom Styled Card</h2>
              <p>This card will keep its custom blue background in both modes</p>
            </div>
          </div>

          <div className="mt-8">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Normal Button (Auto-adapting)
            </button>
            <button className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 no-dark-mode">
              Custom Button (Stays Green)
            </button>
          </div>
        </div>
      </div>
    </DarkModeProvider>
  );
}

export default App;