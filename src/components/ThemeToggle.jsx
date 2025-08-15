import React from 'react';
import { Sun, Moon, Monitor, Languages, Contrast, Settings } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = ({ variant = 'button', showAdvanced = false }) => {
  const {
    isDark,
    isRTL,
    highContrast,
    toggleTheme,
    toggleRTL,
    toggleHighContrast,
    getAnimationClass,
    shouldReduceMotion
  } = useTheme();

  if (variant === 'simple') {
    return (
      <button
        onClick={toggleTheme}
        className={`
          relative w-12 h-12 rounded-2xl
          bg-gradient-to-br from-light-primary-100 to-light-primary-200
          dark:from-dark-primary-700 dark:to-dark-primary-800
          border border-light-border-light dark:border-dark-border-light
          shadow-soft hover:shadow-glow
          transition-all duration-300 ease-out-quart
          hover:scale-105 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
          group overflow-hidden
          ${getAnimationClass('hover:animate-float')}
        `}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        title={`Switch to ${isDark ? 'light' : 'dark'} theme (Ctrl+Shift+T)`}
      >
        {/* Background gradient animation */}
        <div className={`
          absolute inset-0 opacity-0 group-hover:opacity-100
          bg-gradient-to-br from-light-accent-400 to-light-primary-500
          dark:from-dark-accent-600 dark:to-dark-primary-600
          transition-opacity duration-300
          ${!shouldReduceMotion ? 'animate-gradient-shift' : ''}
        `} />
        
        {/* Icon container */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <div className={`
            transition-all duration-500 ease-out-quart
            ${isDark ? 'rotate-180 scale-0' : 'rotate-0 scale-100'}
          `}>
            <Sun className="w-5 h-5 text-light-accent-600" />
          </div>
          <div className={`
            absolute transition-all duration-500 ease-out-quart
            ${isDark ? 'rotate-0 scale-100' : 'rotate-180 scale-0'}
          `}>
            <Moon className="w-5 h-5 text-dark-primary-400" />
          </div>
        </div>
      </button>
    );
  }

  if (variant === 'switch') {
    return (
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <Sun className="w-4 h-4 text-light-accent-600 dark:text-dark-text-tertiary" />
        <button
          onClick={toggleTheme}
          className={`
            relative w-14 h-7 rounded-full
            transition-all duration-300 ease-out-quart
            focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
            ${isDark 
              ? 'bg-gradient-to-r from-dark-primary-600 to-dark-primary-700' 
              : 'bg-gradient-to-r from-light-secondary-200 to-light-secondary-300'
            }
          `}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
          role="switch"
          aria-checked={isDark}
        >
          <div className={`
            absolute top-1 w-5 h-5 rounded-full
            bg-white dark:bg-dark-primary-200
            shadow-soft
            transition-all duration-300 ease-out-quart
            flex items-center justify-center
            ${isDark ? 'translate-x-8 rtl:-translate-x-8' : 'translate-x-1 rtl:-translate-x-1'}
          `}>
            {isDark ? (
              <Moon className="w-3 h-3 text-dark-primary-700" />
            ) : (
              <Sun className="w-3 h-3 text-light-accent-600" />
            )}
          </div>
        </button>
        <Moon className="w-4 h-4 text-dark-primary-400 dark:text-dark-text-secondary" />
      </div>
    );
  }

  // Advanced theme panel
  return (
    <div className={`
      bg-surface-primary border border-light dark:border-dark-border-light
      rounded-2xl shadow-soft backdrop-blur-sm
      p-4 space-y-4
      ${getAnimationClass('animate-fade-in-up')}
    `}>
      <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
        <Settings className="w-5 h-5" />
        Theme Settings
      </h3>
      
      {/* Theme Mode */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-secondary">Appearance</label>
        <div className="flex rounded-xl bg-surface-secondary p-1">
          <button
            onClick={() => !isDark && toggleTheme()}
            className={`
              flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg
              transition-all duration-200 ease-out
              ${!isDark 
                ? 'bg-light-primary-500 text-white shadow-soft' 
                : 'text-secondary hover:text-primary'
              }
            `}
            aria-pressed={!isDark}
          >
            <Sun className="w-4 h-4" />
            Light
          </button>
          <button
            onClick={() => isDark && toggleTheme()}
            className={`
              flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg
              transition-all duration-200 ease-out
              ${isDark 
                ? 'bg-dark-primary-600 text-white shadow-soft' 
                : 'text-secondary hover:text-primary'
              }
            `}
            aria-pressed={isDark}
          >
            <Moon className="w-4 h-4" />
            Dark
          </button>
        </div>
      </div>

      {/* RTL Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-secondary" />
          <span className="text-sm font-medium text-primary">Right-to-Left</span>
        </div>
        <button
          onClick={toggleRTL}
          className={`
            relative w-11 h-6 rounded-full
            transition-all duration-300 ease-out-quart
            focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
            ${isRTL 
              ? 'bg-gradient-to-r from-light-primary-500 to-light-primary-600 dark:from-dark-primary-600 dark:to-dark-primary-700' 
              : 'bg-light-secondary-300 dark:bg-dark-secondary-600'
            }
          `}
          aria-label="Toggle right-to-left text direction"
          role="switch"
          aria-checked={isRTL}
        >
          <div className={`
            absolute top-1 w-4 h-4 rounded-full
            bg-white dark:bg-dark-primary-100
            shadow-soft
            transition-all duration-300 ease-out-quart
            ${isRTL ? 'translate-x-6' : 'translate-x-1'}
          `} />
        </button>
      </div>

      {/* High Contrast */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Contrast className="w-4 h-4 text-secondary" />
          <span className="text-sm font-medium text-primary">High Contrast</span>
        </div>
        <button
          onClick={toggleHighContrast}
          className={`
            relative w-11 h-6 rounded-full
            transition-all duration-300 ease-out-quart
            focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
            ${highContrast 
              ? 'bg-gradient-to-r from-light-error-500 to-light-error-600 dark:from-dark-error-600 dark:to-dark-error-700' 
              : 'bg-light-secondary-300 dark:bg-dark-secondary-600'
            }
          `}
          aria-label="Toggle high contrast mode"
          role="switch"
          aria-checked={highContrast}
        >
          <div className={`
            absolute top-1 w-4 h-4 rounded-full
            bg-white dark:bg-dark-primary-100
            shadow-soft
            transition-all duration-300 ease-out-quart
            ${highContrast ? 'translate-x-6' : 'translate-x-1'}
          `} />
        </button>
      </div>

      {/* Keyboard Shortcut Info */}
      <div className="pt-3 border-t border-light dark:border-dark-border-light">
        <p className="text-xs text-tertiary">
          Press <kbd className="px-2 py-1 bg-surface-secondary rounded text-primary font-mono">Ctrl</kbd> + 
          <kbd className="px-2 py-1 bg-surface-secondary rounded text-primary font-mono">Shift</kbd> + 
          <kbd className="px-2 py-1 bg-surface-secondary rounded text-primary font-mono">T</kbd> to toggle theme
        </p>
      </div>
    </div>
  );
};

export default ThemeToggle;