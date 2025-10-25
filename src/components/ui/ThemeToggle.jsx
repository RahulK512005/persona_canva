import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document?.documentElement;
    
    if (theme === 'dark') {
      root.classList?.add('dark');
    } else {
      root.classList?.remove('dark');
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-5 h-5">
        <Icon
          name="Sun"
          size={20}
          className={`absolute inset-0 transition-all duration-300 ease-in-out ${
            theme === 'light' ?'rotate-0 scale-100 opacity-100' :'rotate-90 scale-0 opacity-0'
          }`}
        />
        <Icon
          name="Moon"
          size={20}
          className={`absolute inset-0 transition-all duration-300 ease-in-out ${
            theme === 'dark' ?'rotate-0 scale-100 opacity-100' :'-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;