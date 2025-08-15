import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// Theme configuration with WCAG 3 compliant colors
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
      '--color-text-primary': '#0f172a',
      '--color-text-secondary': '#475569',
      '--color-text-tertiary': '#64748b',
      '--color-border-light': '#e2e8f0',
      '--color-border-medium': '#cbd5e1',
      '--color-primary-500': '#a569ff',
      '--color-accent-500': '#f97316',
      '--shadow-soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      '--shadow-glow': '0 0 20px rgba(165, 105, 255, 0.15)',
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
      '--color-bg-primary': '#0f1419',
      '--color-bg-secondary': '#1a202c',
      '--color-bg-tertiary': '#2d3748',
      '--color-text-primary': '#f7fafc',
      '--color-text-secondary': '#e2e8f0',
      '--color-text-tertiary': '#cbd5e0',
      '--color-border-light': '#2d3748',
      '--color-border-medium': '#4a5568',
      '--color-primary-500': '#bd51ff',
      '--color-accent-500': '#edcc71',
      '--shadow-soft': '0 2px 15px -3px rgba(0, 0, 0, 0.3), 0 10px 20px -2px rgba(0, 0, 0, 0.2)',
      '--shadow-glow': '0 0 20px rgba(189, 81, 255, 0.25)',
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
    return false;
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
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;