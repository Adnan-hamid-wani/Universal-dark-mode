import React, { createContext, useContext, useEffect, useState } from 'react';

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

interface DarkModeProviderProps {
  children: React.ReactNode;
  defaultDark?: boolean;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
  children,
  defaultDark = false,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : defaultDark;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));

    const styleId = 'dark-mode-styles';
    let styleTag = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    const darkModeStyles = `
      :root {
        color-scheme: ${isDarkMode ? 'dark' : 'light'};
      }

      /* Base styles for light mode */
      :root {
        --bg-primary: #ffffff;
        --text-primary: #000000;
        --border-color: #e5e7eb;
      }

      /* Dark mode styles */
      .dark {
        --bg-primary: #1a1a1a;
        --text-primary: #ffffff;
        --border-color: #374151;
      }

      body {
        background-color: var(--bg-primary);
        color: var(--text-primary);
        transition: background-color 0.3s ease, color 0.3s ease;
      }

      /* Apply dark mode styles to all elements except those with no-dark-mode */
      .dark *:not(.no-dark-mode):not(.no-dark-mode *) {
        border-color: var(--border-color);
        background-color: var(--bg-primary);
        color: var(--text-primary);
      }

      /* Preserve specific Tailwind classes in dark mode */
      .dark *:not(.no-dark-mode)[class*="bg-"]:not([class*="hover\\:bg-"]) {
        background-color: inherit;
      }

      .dark *:not(.no-dark-mode)[class*="text-"]:not([class*="hover\\:text-"]) {
        color: inherit;
      }

      .dark *:not(.no-dark-mode)[class*="border-"]:not([class*="hover\\:border-"]) {
        border-color: inherit;
      }

      /* Transition styles */
      *:not(.no-dark-mode) {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
      }

      /* Preserve transparent backgrounds */
      .dark *:not(.no-dark-mode)[style*="background: none"],
      .dark *:not(.no-dark-mode)[style*="background: transparent"],
      .dark *:not(.no-dark-mode)[style*="background-color: transparent"] {
        background: transparent !important;
      }
    `;

    styleTag.textContent = darkModeStyles;

    return () => {
      styleTag.remove();
    };
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};