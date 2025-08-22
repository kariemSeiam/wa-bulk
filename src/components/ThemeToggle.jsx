import React from 'react';
import { Sun, Moon, Monitor, Languages, Contrast, Settings, Sparkles } from 'lucide-react';
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
    shouldReduceMotion,
    getTransitionClass
  } = useTheme();

  if (variant === 'simple') {
    return (
      <button
        onClick={toggleTheme}
        className={`
          relative w-14 h-14 rounded-3xl
          bg-gradient-to-br from-light-primary-100/80 via-light-primary-200/80 to-light-primary-100/80
          dark:from-dark-primary-700/80 dark:via-dark-primary-800/80 dark:to-dark-primary-700/80
          border border-light/30 dark:border-dark-border-light/30 backdrop-blur-glass
          shadow-glow hover:shadow-glow-strong
          transition-all duration-300 ease-spring
          hover:scale-110 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
          group overflow-hidden touch-target
          ${getAnimationClass('hover:animate-float')}
        `}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        title={`Switch to ${isDark ? 'light' : 'dark'} theme (Ctrl+Shift+T)`}
      >
        {/* Enhanced background gradient animation */}
        <div className={`
          absolute inset-0 opacity-0 group-hover:opacity-100
          bg-gradient-to-br from-light-accent-400/80 via-light-primary-500/80 to-light-accent-600/80
          dark:from-dark-accent-600/80 dark:via-dark-primary-600/80 dark:to-dark-accent-700/80
          transition-opacity duration-300 rounded-3xl
          ${!shouldReduceMotion ? 'animate-gradient-shift' : ''}
        `} />
        
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-glass-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
        
        {/* Sparkle effects */}
        {!shouldReduceMotion && (
          <>
            <div className={`absolute top-2 right-2 w-1 h-1 bg-light-accent-400 dark:bg-dark-accent-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${getAnimationClass('animate-pulse-soft')}`} />
            <div className={`absolute bottom-2 left-2 w-0.5 h-0.5 bg-light-primary-400 dark:bg-dark-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${getAnimationClass('animate-pulse-soft')}`} style={{ animationDelay: '0.5s' }} />
          </>
        )}
        
        {/* Icon container */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <div className={`
            transition-all duration-500 ease-spring
            ${isDark ? 'rotate-180 scale-0' : 'rotate-0 scale-100'}
          `}>
            <Sun className="w-6 h-6 text-light-accent-600 drop-shadow-sm" />
          </div>
          <div className={`
            absolute transition-all duration-500 ease-spring
            ${isDark ? 'rotate-0 scale-100' : 'rotate-180 scale-0'}
          `}>
            <Moon className="w-6 h-6 text-dark-primary-400 drop-shadow-sm" />
          </div>
        </div>
      </button>
    );
  }

  if (variant === 'switch') {
    return (
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <Sun className="w-5 h-5 text-light-accent-600 dark:text-dark-text-tertiary" />
        <button
          onClick={toggleTheme}
          className={`
            relative w-16 h-8 rounded-full backdrop-blur-glass
            transition-all duration-300 ease-spring
            focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
            ${isDark 
              ? 'bg-gradient-to-r from-dark-primary-600/80 to-dark-primary-700/80 shadow-glow' 
              : 'bg-gradient-to-r from-light-secondary-200/80 to-light-secondary-300/80'
            }
            hover:scale-105 touch-target
          `}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
          role="switch"
          aria-checked={isDark}
        >
          <div className={`
            absolute top-1 w-6 h-6 rounded-full
            bg-white dark:bg-dark-primary-200 backdrop-blur-glass
            shadow-medium
            transition-all duration-300 ease-spring
            flex items-center justify-center
            ${isDark ? 'translate-x-9 rtl:-translate-x-9' : 'translate-x-1 rtl:-translate-x-1'}
          `}>
            {isDark ? (
              <Moon className="w-4 h-4 text-dark-primary-700" />
            ) : (
              <Sun className="w-4 h-4 text-light-accent-600" />
            )}
          </div>
        </button>
        <Moon className="w-5 h-5 text-dark-primary-400 dark:text-dark-text-secondary" />
      </div>
    );
  }

  // Enhanced advanced theme panel
  return (
    <div className={`
      bg-surface-primary/95 border border-light/30 dark:border-dark-border-light/30
      rounded-4xl shadow-glass-strong backdrop-blur-glass
      p-6 space-y-6
      ${getAnimationClass('animate-fade-in-up')}
    `}>
      <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-3 bg-gradient-to-r from-light-primary-600 to-light-primary-700 dark:from-dark-primary-400 dark:to-dark-primary-300 bg-clip-text text-transparent">
        <Settings className="w-6 h-6 text-light-primary-500 dark:text-dark-primary-400" />
        إعدادات المظهر
      </h3>
      
      {/* Theme Mode */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-secondary flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          وضع المظهر
        </label>
        <div className="flex rounded-2xl bg-surface-secondary/80 p-2 backdrop-blur-glass">
          <button
            onClick={() => !isDark && toggleTheme()}
            className={`
              flex-1 flex items-center justify-center gap-3 px-4 py-3 rounded-xl
              transition-all duration-300 ease-spring font-semibold
              ${!isDark 
                ? 'bg-light-primary-500 text-white shadow-glow scale-105' 
                : 'text-secondary hover:text-primary hover:bg-surface-tertiary/60'
              }
              touch-target
            `}
            aria-pressed={!isDark}
          >
            <Sun className="w-5 h-5" />
            فاتح
          </button>
          <button
            onClick={() => isDark && toggleTheme()}
            className={`
              flex-1 flex items-center justify-center gap-3 px-4 py-3 rounded-xl
              transition-all duration-300 ease-spring font-semibold
              ${isDark 
                ? 'bg-dark-primary-600 text-white shadow-glow scale-105' 
                : 'text-secondary hover:text-primary hover:bg-surface-tertiary/60'
              }
              touch-target
            `}
            aria-pressed={isDark}
          >
            <Moon className="w-5 h-5" />
            داكن
          </button>
        </div>
      </div>

      {/* RTL Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Languages className="w-5 h-5 text-secondary" />
          <span className="text-sm font-bold text-primary">اتجاه النص</span>
        </div>
        <button
          onClick={toggleRTL}
          className={`
            relative w-14 h-7 rounded-full backdrop-blur-glass
            transition-all duration-300 ease-spring
            focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
            ${isRTL 
              ? 'bg-gradient-to-r from-light-primary-500/80 to-light-primary-600/80 dark:from-dark-primary-600/80 dark:to-dark-primary-700/80 shadow-glow' 
              : 'bg-light-secondary-300/80 dark:bg-dark-secondary-600/80'
            }
            hover:scale-105 touch-target
          `}
          aria-label="Toggle right-to-left text direction"
          role="switch"
          aria-checked={isRTL}
        >
          <div className={`
            absolute top-1 w-5 h-5 rounded-full
            bg-white dark:bg-dark-primary-100 backdrop-blur-glass
            shadow-medium
            transition-all duration-300 ease-spring
            ${isRTL ? 'translate-x-7' : 'translate-x-1'}
          `} />
        </button>
      </div>

      {/* High Contrast */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Contrast className="w-5 h-5 text-secondary" />
          <span className="text-sm font-bold text-primary">التباين العالي</span>
        </div>
        <button
          onClick={toggleHighContrast}
          className={`
            relative w-14 h-7 rounded-full backdrop-blur-glass
            transition-all duration-300 ease-spring
            focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
            ${highContrast 
              ? 'bg-gradient-to-r from-light-error-500/80 to-light-error-600/80 dark:from-dark-error-600/80 dark:to-dark-error-700/80 shadow-glow' 
              : 'bg-light-secondary-300/80 dark:bg-dark-secondary-600/80'
            }
            hover:scale-105 touch-target
          `}
          aria-label="Toggle high contrast mode"
          role="switch"
          aria-checked={highContrast}
        >
          <div className={`
            absolute top-1 w-5 h-5 rounded-full
            bg-white dark:bg-dark-primary-100 backdrop-blur-glass
            shadow-medium
            transition-all duration-300 ease-spring
            ${highContrast ? 'translate-x-7' : 'translate-x-1'}
          `} />
        </button>
      </div>

      {/* Enhanced Keyboard Shortcut Info */}
      <div className="pt-4 border-t border-light/20 dark:border-dark-border-light/20">
        <p className="text-sm text-tertiary bg-surface-secondary/50 rounded-2xl p-4 backdrop-blur-glass">
          اضغط <kbd className="px-3 py-1 bg-surface-tertiary rounded-xl text-primary font-mono font-bold">Ctrl</kbd> + 
          <kbd className="px-3 py-1 bg-surface-tertiary rounded-xl text-primary font-mono font-bold">Shift</kbd> + 
          <kbd className="px-3 py-1 bg-surface-tertiary rounded-xl text-primary font-mono font-bold">T</kbd> لتغيير المظهر
        </p>
      </div>
    </div>
  );
};

export default ThemeToggle;