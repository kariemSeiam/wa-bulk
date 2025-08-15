import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Filter, Sparkles } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "البحث في الأماكن...",
  showFilters = false,
  onFilterClick,
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
    <div className={`relative group ${className}`}>
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
            <div className="absolute top-2 left-4 w-1 h-1 bg-light-primary-400 dark:bg-dark-primary-400 rounded-full animate-pulse-soft" />
            <div className="absolute top-4 right-6 w-1.5 h-1.5 bg-light-accent-400 dark:bg-dark-accent-400 rounded-full animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-3 left-8 w-1 h-1 bg-light-success-400 dark:bg-dark-success-400 rounded-full animate-pulse-soft" style={{ animationDelay: '1s' }} />
          </>
        )}

        {/* Search Content */}
        <div className="relative flex items-center p-4 gap-4">
          
          {/* Search Icon with Animation */}
          <div className={`
            relative transition-all duration-300 ease-out-quart
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
              ${getRTLClass('text-left', 'text-right')}
              font-medium
            `}
            dir={isRTL ? 'rtl' : 'ltr'}
            aria-label={placeholder}
          />

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Clear Button */}
            {hasValue && (
              <button
                onClick={clearSearch}
                className={`
                  p-2 rounded-xl bg-light-error-100 dark:bg-dark-error-900/30
                  text-light-error-600 dark:text-dark-error-400
                  hover:bg-light-error-200 dark:hover:bg-dark-error-900/50
                  transition-all duration-300 opacity-0 scale-75
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

            {/* Filter Button */}
            {showFilters && (
              <button
                onClick={onFilterClick}
                className={`
                  p-2 rounded-xl bg-light-secondary-100 dark:bg-dark-secondary-800
                  text-light-secondary-600 dark:text-dark-secondary-400
                  hover:bg-light-secondary-200 dark:hover:bg-dark-secondary-700
                  hover:text-light-primary-600 dark:hover:text-dark-primary-400
                  transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                  ${getAnimationClass('hover:scale-105')}
                `}
                aria-label="خيارات التصفية"
                title="خيارات التصفية"
              >
                <Filter size={16} />
              </button>
            )}

            {/* Magic/AI Button (for future AI search features) */}
            <button
              className={`
                p-2 rounded-xl bg-gradient-to-br from-light-primary-100 to-light-accent-100
                dark:from-dark-primary-900/30 dark:to-dark-accent-900/30
                text-light-primary-600 dark:text-dark-primary-400
                hover:from-light-primary-200 hover:to-light-accent-200
                dark:hover:from-dark-primary-800/50 dark:hover:to-dark-accent-800/50
                transition-all duration-300 opacity-0 scale-75
                ${isFocused ? 'opacity-100 scale-100' : 'group-hover:opacity-60 group-hover:scale-90'}
                focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500
                ${getAnimationClass('hover:scale-105')}
              `}
              aria-label="بحث ذكي"
              title="بحث ذكي"
            >
              <Sparkles size={16} className={!shouldReduceMotion ? 'animate-pulse-soft' : ''} />
            </button>
          </div>
        </div>

        {/* Bottom Border Animation */}
        <div className={`
          absolute bottom-0 left-0 h-0.5 bg-gradient-to-r 
          from-light-primary-500 via-light-accent-500 to-light-primary-500
          dark:from-dark-primary-500 dark:via-dark-accent-500 dark:to-dark-primary-500
          transition-all duration-500 ease-out-quart
          ${isFocused ? 'w-full opacity-100' : 'w-0 opacity-0'}
        `} />
      </div>

      {/* Floating Labels/Suggestions (for future enhancement) */}
      {isFocused && !hasValue && (
        <div className={`
          absolute top-full left-0 right-0 mt-2 p-3
          bg-surface-primary border border-light dark:border-dark-border-light
          rounded-2xl shadow-medium backdrop-blur-sm z-10
          ${getAnimationClass('animate-fade-in-up')}
        `}>
          <div className="text-xs text-tertiary font-medium mb-2">اقتراحات البحث:</div>
          <div className="flex flex-wrap gap-2">
            {['الأماكن المتصلة', 'الأماكن الجديدة', 'جهات الاتصال'].map((suggestion, index) => (
              <button
                key={suggestion}
                onClick={() => onChange({ target: { value: suggestion } })}
                className={`
                  px-3 py-1.5 text-xs rounded-xl bg-surface-secondary
                  text-secondary hover:text-primary hover:bg-surface-tertiary
                  transition-all duration-200 border border-light dark:border-dark-border-light
                  ${getAnimationClass('hover:scale-105')}
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

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