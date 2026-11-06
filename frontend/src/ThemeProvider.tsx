import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';


type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'light',
  setMode: () => {},
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('light');
  
  // Check for saved theme preference or system preference
  useEffect(() => {
    const savedMode = localStorage.getItem('formlink-theme') as ThemeMode | null;
    
    if (savedMode) {
      setMode(savedMode);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode('system');
    }
  }, []);
  
  // Update when mode changes
  useEffect(() => {
    if (mode === 'system') {
      const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', isDark);
    } else {
      document.documentElement.classList.toggle('dark', mode === 'dark');
    }
    
    localStorage.setItem('formlink-theme', mode);
  }, [mode]);
  
  // Toggle between light and dark
  const toggleTheme = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  const value = {
    mode,
    setMode,
    toggleTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      <Theme 
        appearance={mode === 'system' 
          ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
          : mode
        } 
        accentColor="blue"
        grayColor="slate"
        scaling="100%"
        radius="medium"
      >
        {children}
      </Theme>
    </ThemeContext.Provider>
  );
};