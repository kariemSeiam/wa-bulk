import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Sparkles, Zap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "البحث في الأماكن...",
  className = ""
}) => {
  const { getAnimationClass, isRTL, getRTLClass, shouldReduceMotion, getTransitionClass } = useTheme();
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
        relative bg-surface-secondary/80 border backdrop-blur-glass
        rounded-4xl overflow-hidden ${getTransitionClass('slow')}
        ${isFocused 
          ? 'border-light-primary-400/40 dark:border-dark-primary-500/40 shadow-glow bg-surface-primary/90 scale-105' 
          : 'border-light/30 dark:border-dark-border-light/30 hover:border-light-primary-300/50 dark:hover:border-dark-primary-600/50 hover:scale-102'
        }
        ${isTyping && !shouldReduceMotion ? 'animate-glow-pulse' : ''}
      `}>
        
        {/* Enhanced Animated Background Gradient */}
        <div className={`
          absolute inset-0 opacity-0 transition-opacity duration-500
          bg-gradient-to-r from-light-primary-50/80 via-light-accent-50/80 to-light-primary-50/80
          dark:from-dark-primary-900/50 dark:via-dark-accent-900/50 dark:to-dark-primary-900/50
          ${isFocused ? 'opacity-100' : 'group-hover:opacity-70'}
          ${!shouldReduceMotion ? 'animate-gradient-shift' : ''}
        `} />

        {/* Enhanced Sparkle Effects */}
        {!shouldReduceMotion && isFocused && (
          <>
            <div className={`absolute top-3 ${getRTLClass('left-6', 'right-6')} w-1.5 h-1.5 bg-light-primary-400 dark:bg-dark-primary-400 rounded-full animate-pulse-soft`} />
            <div className={`absolute top-5 ${getRTLClass('right-8', 'left-8')} w-1 h-1 bg-light-accent-400 dark:bg-dark-accent-400 rounded-full animate-pulse-soft`} style={{ animationDelay: '0.5s' }} />
            <div className={`absolute bottom-4 ${getRTLClass('left-10', 'right-10')} w-1.5 h-1.5 bg-light-success-400 dark:bg-dark-success-400 rounded-full animate-pulse-soft`} style={{ animationDelay: '1s' }} />
            <div className={`absolute bottom-3 ${getRTLClass('right-12', 'left-12')} w-0.5 h-0.5 bg-light-primary-500 dark:bg-dark-primary-400 rounded-full animate-pulse-soft`} style={{ animationDelay: '1.5s' }} />
          </>
        )}

        {/* Search Content */}
        <div className={`relative flex items-center p-6 gap-5 ${getRTLClass('', 'flex-row-reverse')}`}>
          
          {/* Enhanced Search Icon with Animation */}
          <div className={`
            relative transition-all duration-300 ease-spring flex-shrink-0
            ${isFocused ? 'text-light-primary-600 dark:text-dark-primary-400 scale-125' : 'text-tertiary scale-100'}
          `}>
            <Search size={24} className="transition-transform duration-300" />
            
            {/* Enhanced Icon Glow Effect */}
            {isFocused && (
              <>
                <div className="absolute inset-0 blur-md opacity-60">
                  <Search size={24} className="text-light-primary-400 dark:text-dark-primary-400" />
                </div>
                <div className={`absolute -inset-2 bg-light-primary-500/20 dark:bg-dark-primary-500/30 rounded-full blur-lg ${getAnimationClass('animate-pulse-soft')}`} />
              </>
            )}
          </div>

          {/* Enhanced Input Field */}
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
              ${isFocused ? 'text-xl font-semibold' : 'text-lg font-medium'}
              text-right
            `}
            dir="rtl"
            aria-label={placeholder}
          />

          {/* Enhanced Clear Button */}
          {hasValue && (
            <button
              onClick={clearSearch}
              className={`
                p-3 rounded-2xl bg-light-error-100/80 dark:bg-dark-error-900/50
                text-light-error-600 dark:text-dark-error-400 backdrop-blur-glass
                hover:bg-light-error-200/80 dark:hover:bg-dark-error-900/70
                transition-all duration-300 opacity-0 scale-75 flex-shrink-0
                ${hasValue ? 'opacity-100 scale-100' : ''}
                focus:outline-none focus:ring-2 focus:ring-light-error-500 dark:focus:ring-dark-error-500
                ${getAnimationClass('hover:scale-110 hover:rotate-90')}
                touch-target
              `}
              aria-label="مسح البحث"
              title="مسح البحث"
            >
              <X size={18} />
            </button>
          )}

          {/* Magic wand effect when typing */}
          {isTyping && !shouldReduceMotion && (
            <div className={`absolute ${getRTLClass('right-16', 'left-16')} top-1/2 transform -translate-y-1/2`}>
              <Sparkles className="w-5 h-5 text-light-primary-500 dark:text-dark-primary-400 animate-wiggle" />
            </div>
          )}
        </div>

        {/* Enhanced Bottom Border Animation */}
        <div className={`
          absolute bottom-0 ${getRTLClass('left-0', 'right-0')} h-1 bg-gradient-to-r 
          from-light-primary-500 via-light-accent-500 to-light-primary-500
          dark:from-dark-primary-500 dark:via-dark-accent-500 dark:to-dark-primary-500
          transition-all duration-500 ease-spring rounded-full
          ${isFocused ? 'w-full opacity-100' : 'w-0 opacity-0'}
        `} />

        {/* Floating action hint */}
        {isFocused && !hasValue && (
          <div className={`
            absolute ${getRTLClass('left-6', 'right-6')} top-full mt-3
            text-xs text-tertiary font-medium bg-surface-secondary/80 
            px-4 py-2 rounded-2xl backdrop-blur-glass
            ${getAnimationClass('animate-slide-down')}
          `}>
            <Zap className="w-3 h-3 inline ml-1" />
            ابدأ بالكتابة للبحث السريع...
          </div>
        )}
      </div>

      {/* Enhanced Search Results Indicator */}
      {hasValue && (
        <div className={`
          absolute ${getRTLClass('left-6', 'right-6')} -bottom-10 
          text-sm text-tertiary font-semibold bg-surface-secondary/80 
          px-4 py-2 rounded-2xl backdrop-blur-glass border border-light/20 dark:border-dark-border-light/20
          ${getAnimationClass('animate-fade-in')}
        `}>
          <Search className="w-3 h-3 inline ml-1" />
          البحث عن "{value}"
        </div>
      )}
    </div>
  );
};

export default SearchBar;