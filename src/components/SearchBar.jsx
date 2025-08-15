import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "البحث في الأماكن...",
  className = ""
}) => {
  const { getAnimationClass, isRTL, getRTLClass, shouldReduceMotion } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    setHasValue(value && value.length > 0);
  }, [value]);

  const clearSearch = () => {
    onChange({ target: { value: '' } });
    inputRef.current?.focus();
  };

  const handleChange = (e) => {
    onChange(e);
    
    // Trigger typing animation
    setIsTyping(true);
    
    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set timeout to stop typing animation
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && value) {
      clearSearch();
    }
  };

  return (
    <div className={`relative group ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Main Search Container */}
      <div className={`
        relative bg-surface-secondary border-2 transition-all duration-500 ease-out-quart
        rounded-3xl overflow-hidden backdrop-blur-sm
        ${isFocused 
          ? 'border-light-primary-400 dark:border-dark-primary-500 shadow-glow bg-surface-primary' 
          : 'border-light-border-light dark:border-dark-border-light hover:border-light-primary-300 dark:hover:border-dark-primary-600'
        }
        ${getAnimationClass('hover:scale-[1.01]')}
        ${isTyping && !shouldReduceMotion ? 'animate-search-typing' : ''}
      `}>
        
        {/* Animated Background Gradient */}
        <div className={`
          absolute inset-0 opacity-0 transition-opacity duration-500
          bg-gradient-to-r from-light-primary-50 via-light-accent-50 to-light-primary-50
          dark:from-dark-primary-900/30 dark:via-dark-accent-900/30 dark:to-dark-primary-900/30
          ${isFocused ? 'opacity-100' : 'group-hover:opacity-50'}
          ${!shouldReduceMotion ? 'animate-gradient-shift' : ''}
        `} />

        {/* Sparkle Effects */}
        {!shouldReduceMotion && isFocused && (
          <>
            <div className={`absolute top-2 ${getRTLClass('left-4', 'right-4')} w-1 h-1 bg-light-primary-400 dark:bg-dark-primary-400 rounded-full animate-pulse-soft`} />
            <div className={`absolute top-4 ${getRTLClass('right-6', 'left-6')} w-1.5 h-1.5 bg-light-accent-400 dark:bg-dark-accent-400 rounded-full animate-pulse-soft`} style={{ animationDelay: '0.5s' }} />
            <div className={`absolute bottom-3 ${getRTLClass('left-8', 'right-8')} w-1 h-1 bg-light-success-400 dark:bg-dark-success-400 rounded-full animate-pulse-soft`} style={{ animationDelay: '1s' }} />
          </>
        )}

        {/* Search Content */}
        <div className={`relative flex items-center p-4 gap-4 ${getRTLClass('', 'flex-row-reverse')}`}>
          
          {/* Search Icon with Animation */}
          <div className={`
            relative transition-all duration-300 ease-out-quart flex-shrink-0
            ${isFocused ? 'text-light-primary-600 dark:text-dark-primary-400 scale-110' : 'text-tertiary'}
          `}>
            <Search size={22} className="transition-transform duration-300" />
            {/* Icon Glow Effect */}
            {isFocused && (
              <div className="absolute inset-0 blur-sm opacity-50">
                <Search size={22} className="text-light-primary-400 dark:text-dark-primary-400" />
              </div>
            )}
          </div>

          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`
              flex-1 bg-transparent text-primary placeholder-tertiary
              focus:outline-none transition-all duration-300
              ${isFocused ? 'text-lg' : 'text-base'}
              text-right font-medium
            `}
            dir="rtl"
            aria-label={placeholder}
          />

          {/* Clear Button */}
          {hasValue && (
            <button
              onClick={clearSearch}
              className={`
                p-2 rounded-xl bg-light-error-100 dark:bg-dark-error-900/30
                text-light-error-600 dark:text-dark-error-400
                hover:bg-light-error-200 dark:hover:bg-dark-error-900/50
                transition-all duration-300 opacity-0 scale-75 flex-shrink-0
                ${hasValue ? 'opacity-100 scale-100' : ''}
                focus:outline-none focus:ring-2 focus:ring-light-error-500 dark:focus:ring-dark-error-500
                ${getAnimationClass('hover:scale-105 hover:rotate-90')}
              `}
              aria-label="مسح البحث"
              title="مسح البحث"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Bottom Border Animation */}
        <div className={`
          absolute bottom-0 ${getRTLClass('left-0', 'right-0')} h-0.5 bg-gradient-to-r 
          from-light-primary-500 via-light-accent-500 to-light-primary-500
          dark:from-dark-primary-500 dark:via-dark-accent-500 dark:to-dark-primary-500
          transition-all duration-500 ease-out-quart
          ${isFocused ? 'w-full opacity-100' : 'w-0 opacity-0'}
        `} />
      </div>

      {/* Search Results Count (when searching) */}
      {hasValue && (
        <div className={`
          absolute ${getRTLClass('left-4', 'right-4')} -bottom-8 
          text-xs text-tertiary font-medium
          ${getAnimationClass('animate-fade-in')}
        `}>
          جاري البحث عن "{value}"...
        </div>
      )}
    </div>
  );
};

export default SearchBar;