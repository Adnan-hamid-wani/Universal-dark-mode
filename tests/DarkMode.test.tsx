import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { DarkModeProvider, DarkModeToggle, useDarkMode } from '../src';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key],
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('DarkMode Components', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
    localStorage.clear();
    
    // Clean up any previously added style tags
    const styleTag = document.getElementById('dark-mode-styles');
    if (styleTag) {
      styleTag.remove();
    }
  });

  it('should render DarkModeToggle button', () => {
    render(
      <DarkModeProvider>
        <DarkModeToggle />
      </DarkModeProvider>
    );
    expect(screen.getByRole('button')).toBeDefined();
  });

  it('should toggle dark mode when clicked', () => {
    render(
      <DarkModeProvider>
        <DarkModeToggle />
      </DarkModeProvider>
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('darkMode')).toBe('true');
    expect(document.getElementById('dark-mode-styles')).toBeTruthy();
    
    fireEvent.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('darkMode')).toBe('false');
  });

  it('should respect defaultDark prop', () => {
    render(
      <DarkModeProvider defaultDark={true}>
        <DarkModeToggle />
      </DarkModeProvider>
    );
    
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should persist dark mode preference in localStorage', () => {
    localStorage.setItem('darkMode', 'true');
    
    render(
      <DarkModeProvider>
        <DarkModeToggle />
      </DarkModeProvider>
    );
    
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should not apply dark mode styles to elements with no-dark-mode class', () => {
    render(
      <DarkModeProvider defaultDark={true}>
        <div data-testid="dark-mode-element">Dark mode element</div>
        <div data-testid="no-dark-mode-element" className="no-dark-mode">
          No dark mode element
        </div>
      </DarkModeProvider>
    );

    const styleTag = document.getElementById('dark-mode-styles');
    expect(styleTag?.textContent).toContain('.no-dark-mode');
  });

  // Test custom hook
  const TestComponent = () => {
    const { isDarkMode } = useDarkMode();
    return <div data-testid="dark-mode-value">{isDarkMode.toString()}</div>;
  };

  it('should provide dark mode value through hook', () => {
    render(
      <DarkModeProvider defaultDark={true}>
        <TestComponent />
      </DarkModeProvider>
    );
    
    expect(screen.getByTestId('dark-mode-value').textContent).toBe('true');
  });
});