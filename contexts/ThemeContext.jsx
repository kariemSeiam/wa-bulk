import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// Modern theme configuration with enhanced WCAG 3 compliant colors
const themeConfig = {
  light: {
    name: 'light',
    colors: {
      primary: 'light-primary',
      secondary: 'light-secondary',
      accent: 'light-accent',
      success: 'light-success',
      warning: 'light-warning',
      error: 'light-error',
      surface: 'light-surface',
      text: 'light-text',
      border: 'light-border',
    },
    cssVars: {
      '--color-bg-primary': '#ffffff',
      '--color-bg-secondary': '#f8fafc',
      '--color-bg-tertiary': '#f1f5f9',
      '--color-bg-glass': 'rgba(255, 255, 255, 0.8)',
      '--color-text-primary': '#0f172a',
      '--color-text-secondary': '#475569',
      '--color-text-tertiary': '#64748b',
      '--color-border-light': '#e2e8f0',
      '--color-border-medium': '#cbd5e1',
      '--color-primary-500': '#6366f1',
      '--color-accent-500': '#f97316',
      '--shadow-soft': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      '--shadow-medium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      '--shadow-glow': '0 0 20px rgba(99, 102, 241, 0.3)',
      '--shadow-glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    }
  },
  dark: {
    name: 'dark',
    colors: {
      primary: 'dark-primary',
      secondary: 'dark-secondary',
      accent: 'dark-accent',
      success: 'dark-success',
      warning: 'dark-warning',
      error: 'dark-error',
      surface: 'dark-surface',
      text: 'dark-text',
      border: 'dark-border',
    },
    cssVars: {
      '--color-bg-primary': '#0a0a0f',
      '--color-bg-secondary': '#14141f',
      '--color-bg-tertiary': '#1e1e2e',
      '--color-bg-glass': 'rgba(20, 20, 31, 0.8)',
      '--color-text-primary': '#f8fafc',
      '--color-text-secondary': '#e2e8f0',
      '--color-text-tertiary': '#cbd5e0',
      '--color-border-light': '#1e1e2e',
      '--color-border-medium': '#28283d',
      '--color-primary-500': '#7f7fdb',
      '--color-accent-500': '#c59764',
      '--shadow-soft': '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
      '--shadow-medium': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      '--shadow-glow': '0 0 20px rgba(127, 127, 219, 0.4)',
      '--shadow-glass': '0 8px 32px 0 rgba(10, 10, 15, 0.6)',
    }
  }
};

// RTL languages list
const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur', 'ku', 'dv'];

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Check system preference first, then localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme-mode');
      if (saved) {
        return saved === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [isRTL, setIsRTL] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme-rtl');
      if (saved) {
        return saved === 'true';
      }
      // Auto-detect from browser language
      const lang = navigator.language.split('-')[0];
      return RTL_LANGUAGES.includes(lang);
    }
    return true; // Default to RTL for Arabic app
  });

  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const [highContrast, setHighContrast] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme-high-contrast');
      return saved === 'true';
    }
    return false;
  });

  const currentTheme = isDark ? themeConfig.dark : themeConfig.light;

  // Apply CSS variables to document root
  const applyCSSVariables = useCallback((theme) => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      Object.entries(theme.cssVars).forEach(([property, value]) => {
        root.style.setProperty(property, value);
      });
    }
  }, []);

  // Toggle theme with smooth transition
  const toggleTheme = useCallback(() => {
    // Add transition class
    document.documentElement.classList.add('theme-transition');
    
    setIsDark(prev => {
      const newValue = !prev;
      localStorage.setItem('theme-mode', newValue ? 'dark' : 'light');
      return newValue;
    });

    // Remove transition class after animation
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);
  }, []);

  // Toggle RTL
  const toggleRTL = useCallback(() => {
    setIsRTL(prev => {
      const newValue = !prev;
      localStorage.setItem('theme-rtl', newValue.toString());
      return newValue;
    });
  }, []);

  // Toggle high contrast
  const toggleHighContrast = useCallback(() => {
    setHighContrast(prev => {
      const newValue = !prev;
      localStorage.setItem('theme-high-contrast', newValue.toString());
      return newValue;
    });
  }, []);

  // System theme change listener
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleSystemThemeChange = (e) => {
      // Only apply system theme if user hasn't set a preference
      if (!localStorage.getItem('theme-mode')) {
        setIsDark(e.matches);
      }
    };

    const handleMotionChange = (e) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Apply theme changes to DOM
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const html = document.documentElement;
    const body = document.body;

    // Apply theme class
    html.className = html.className.replace(/\b(light|dark)\b/g, '');
    html.classList.add(isDark ? 'dark' : 'light');

    // Apply RTL direction
    html.dir = isRTL ? 'rtl' : 'ltr';
    html.lang = isRTL ? 'ar' : 'en';

    // Apply accessibility classes
    if (reducedMotion) {
      html.classList.add('reduce-motion');
    } else {
      html.classList.remove('reduce-motion');
    }

    if (highContrast) {
      html.classList.add('high-contrast');
    } else {
      html.classList.remove('high-contrast');
    }

    // Apply CSS variables
    applyCSSVariables(currentTheme);

    // Update meta theme-color for mobile browsers
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.content = currentTheme.cssVars['--color-bg-primary'];

    // Update viewport meta for better mobile experience
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      document.head.appendChild(viewportMeta);
    }
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';

  }, [isDark, isRTL, reducedMotion, highContrast, currentTheme, applyCSSVariables]);

  // Keyboard shortcut for theme toggle (Ctrl/Cmd + Shift + T)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleKeydown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [toggleTheme]);

  const value = {
    // Theme state
    isDark,
    isRTL,
    reducedMotion,
    highContrast,
    currentTheme,
    
    // Theme actions
    toggleTheme,
    toggleRTL,
    toggleHighContrast,
    
    // Theme utilities
    getThemeClass: (lightClass, darkClass) => isDark ? darkClass : lightClass,
    getRTLClass: (ltrClass, rtlClass) => isRTL ? rtlClass : ltrClass,
    
    // Accessibility helpers
    shouldReduceMotion: reducedMotion,
    getAnimationClass: (animationClass) => reducedMotion ? '' : animationClass,
    
    // Color utilities
    colors: currentTheme.colors,
    cssVars: currentTheme.cssVars,
    
    // Performance helpers
    getTransitionClass: (duration = 'normal') => {
      const transitions = {
        fast: 'transition-all duration-150 ease-out',
        normal: 'transition-all duration-300 ease-out',
        slow: 'transition-all duration-500 ease-out',
        spring: 'transition-all duration-300 ease-spring',
      };
      return transitions[duration] || transitions.normal;
    },
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;