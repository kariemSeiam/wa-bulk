import React from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const LogoIcon = ({ className = "w-12 h-12 sm:w-16 sm:h-16", isDark = false }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={className} role="img" aria-label="WA-Bulk Logo">
    <defs>
      {/* Modern gradient for main background */}
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: isDark ? "#7f7fdb" : "#6366f1"}} />
        <stop offset="50%" style={{stopColor: isDark ? "#6e6ec4" : "#4f46e5"}} />
        <stop offset="100%" style={{stopColor: isDark ? "#5d5dad" : "#4338ca"}} />
      </linearGradient>
      
      {/* Modern gradient for accent elements */}
      <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{stopColor: isDark ? "#c59764" : "#f97316"}} />
        <stop offset="100%" style={{stopColor: isDark ? "#b2885a" : "#ea580c"}} />
      </linearGradient>
      
      {/* Enhanced glow effect */}
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="blur" in2="SourceGraphic" operator="over" />
      </filter>
      
      {/* Modern drop shadow */}
      <filter id="dropshadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow 
          dx="0" 
          dy="4" 
          stdDeviation="6" 
          floodColor={isDark ? "#000000" : "#6366f1"} 
          floodOpacity={isDark ? "0.6" : "0.3"}
        />
      </filter>

      {/* Glass morphism effect */}
      <filter id="glass" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="blur" in2="SourceGraphic" operator="over" />
      </filter>
    </defs>

    {/* Main circular background with modern gradient */}
    <circle 
      cx="50" 
      cy="50" 
      r="42" 
      fill="url(#bgGradient)" 
      filter="url(#dropshadow)"
      className="transition-all duration-500"
    />
    
    {/* Glass overlay */}
    <circle 
      cx="50" 
      cy="50" 
      r="42" 
      fill="rgba(255, 255, 255, 0.1)" 
      className="transition-all duration-300"
    />
    
    {/* Enhanced broadcast waves */}
    <g opacity="0.9" className="animate-pulse-soft">
      <path d="M12 28 Q25 15 38 28" stroke="url(#accentGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M8 33 Q25 15 42 33" stroke="url(#accentGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M6 38 Q25 18 44 38" stroke="url(#accentGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
    
    {/* Modern chat bubble */}
    <path 
      d="M28 33 h28 a10 10 0 0 1 10 10 v14 a10 10 0 0 1 -10 10 h-20 l-8 7 v-7 a10 10 0 0 1 -10 -10 v-14 a10 10 0 0 1 10 -10 z" 
      fill={isDark ? "#f8fafc" : "#ffffff"}
      filter="url(#glass)"
      className="transition-colors duration-300"
    />
    
    {/* Message lines inside chat bubble */}
    <line x1="33" y1="43" x2="58" y2="43" stroke="url(#bgGradient)" strokeWidth="3" strokeLinecap="round" />
    <line x1="33" y1="49" x2="53" y2="49" stroke="url(#bgGradient)" strokeWidth="3" strokeLinecap="round" />
    <line x1="33" y1="55" x2="55" y2="55" stroke="url(#bgGradient)" strokeWidth="3" strokeLinecap="round" />
    
    {/* Enhanced multiple users indicator */}
    <g transform="translate(62, 22)" className="animate-float">
      <circle cx="0" cy="0" r="4" fill="url(#accentGradient)" filter="url(#glow)" />
      <circle cx="9" cy="4" r="4" fill="url(#accentGradient)" filter="url(#glow)" />
      <circle cx="4" cy="9" r="4" fill="url(#accentGradient)" filter="url(#glow)" />
    </g>
    
    {/* Modern send/broadcast arrow */}
    <path 
      d="M70 58 l10 -4 l-10 -4 l0 3 l-8 0 l0 2 l8 0 z" 
      fill={isDark ? "#f8fafc" : "#ffffff"} 
      filter="url(#glass)"
      className="transition-colors duration-300"
    />
    
    {/* Enhanced success indicators */}
    <g transform="translate(68, 43)" opacity="0.95">
      <path d="M0 4 l3 3 l6 -6" stroke="url(#accentGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 4 l3 3 l6 -6" stroke="url(#accentGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

const Logo = ({ className = "", showSubtitle = true }) => {
  const { isDark, isRTL, getAnimationClass, getRTLClass, getTransitionClass } = useTheme();

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="relative group">
        <LogoIcon 
          className={`
            w-16 h-16 sm:w-20 sm:h-20 transition-all duration-500 ease-spring
            ${getAnimationClass('hover:scale-125 hover:rotate-12')}
            cursor-pointer
          `}
          isDark={isDark}
        />
        
        {/* Enhanced animated pulse rings */}
        <div className={`
          absolute inset-0 rounded-full border-2 
          border-light-primary-400/40 dark:border-dark-primary-500/50
          ${getAnimationClass('animate-pulse-soft group-hover:animate-glow-pulse')}
          transition-all duration-300
        `} />
        <div className={`
          absolute inset-2 rounded-full border border-light-accent-400/30 dark:border-dark-accent-500/40
          ${getAnimationClass('animate-pulse-soft')}
          transition-all duration-300
        `} style={{ animationDelay: '1s' }} />
        
        {/* Glass morphism ring */}
        <div className={`
          absolute inset-1 rounded-full border border-white/20 dark:border-white/10
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
          backdrop-blur-sm
        `} />
      </div>
      
      <div className="flex flex-col items-start">
        <h1 className={`
          text-3xl sm:text-4xl font-bold bg-gradient-to-r 
          from-light-primary-600 via-light-accent-500 to-light-primary-500
          dark:from-dark-primary-400 dark:via-dark-accent-600 dark:to-dark-primary-300
          bg-clip-text text-transparent transition-all duration-500
          hover:from-light-primary-500 hover:via-light-accent-400 hover:to-light-primary-400
          dark:hover:from-dark-primary-300 dark:hover:via-dark-accent-500 dark:hover:to-dark-primary-200
          ${getAnimationClass('hover:scale-110')}
          font-primary cursor-pointer
          tracking-tight
        `}>
          WA-Bulk
        </h1>
        {showSubtitle && (
          <p className={`
            text-sm sm:text-base font-bold -mt-1 transition-all duration-300
            bg-gradient-to-r from-light-secondary-600 to-light-secondary-700
            dark:from-dark-secondary-400 dark:to-dark-secondary-300
            bg-clip-text text-transparent
            text-right font-primary tracking-wide
          `}>
            واتساب بالك
          </p>
        )}
      </div>
      
      {/* Enhanced decorative elements */}
      <div className={`
        hidden sm:flex items-center gap-2 mr-4
        ${getAnimationClass('animate-fade-in')}
      `}>
        <div className={`
          w-2 h-2 rounded-full bg-light-primary-500 dark:bg-dark-primary-400
          ${getAnimationClass('animate-pulse-soft')}
          shadow-glow
        `} />
        <div className={`
          w-2 h-2 rounded-full bg-light-accent-500 dark:bg-dark-accent-500
          ${getAnimationClass('animate-pulse-soft')}
          shadow-glow
        `} style={{animationDelay: '0.7s'}} />
        <div className={`
          w-2 h-2 rounded-full bg-light-success-500 dark:bg-dark-success-400
          ${getAnimationClass('animate-pulse-soft')}
          shadow-glow
        `} style={{animationDelay: '1.4s'}} />
      </div>
    </div>
  );
};

export default Logo;