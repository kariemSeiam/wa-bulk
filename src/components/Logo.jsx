import React from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const LogoIcon = ({ className = "w-8 h-8 sm:w-10 sm:h-10", isDark = false }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={className} role="img" aria-label="WA-Bulk Logo">
    <defs>
      {/* Dynamic gradient for main background */}
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: isDark ? "#bd51ff" : "#a569ff"}} />
        <stop offset="50%" style={{stopColor: isDark ? "#8d3fc5" : "#8b3af7"}} />
        <stop offset="100%" style={{stopColor: isDark ? "#7536a5" : "#7632d8"}} />
      </linearGradient>
      
      {/* Dynamic gradient for broadcast waves */}
      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{stopColor: isDark ? "#edcc71" : "#f97316"}} />
        <stop offset="100%" style={{stopColor: isDark ? "#bda25b" : "#ea580c"}} />
      </linearGradient>
      
      {/* Enhanced glow effect */}
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="blur" in2="SourceGraphic" operator="over" />
      </filter>
      
      {/* Dynamic drop shadow */}
      <filter id="dropshadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow 
          dx="2" 
          dy="4" 
          stdDeviation="4" 
          floodColor={isDark ? "#000000" : "#000000"} 
          floodOpacity={isDark ? "0.4" : "0.2"}
        />
      </filter>
    </defs>

    {/* Main circular background */}
    <circle 
      cx="50" 
      cy="50" 
      r="44" 
      fill="url(#bgGradient)" 
      filter="url(#dropshadow)"
      className="transition-all duration-300"
    />
    
    {/* Broadcast waves (representing bulk messaging) */}
    <g opacity="0.8" className="animate-pulse-soft">
      <path d="M15 30 Q25 18 35 30" stroke="url(#waveGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M10 35 Q25 18 40 35" stroke="url(#waveGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M8 40 Q25 20 42 40" stroke="url(#waveGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
    
    {/* Main chat bubble (enhanced) */}
    <path 
      d="M30 35 h25 a8 8 0 0 1 8 8 v12 a8 8 0 0 1 -8 8 h-18 l-7 6 v-6 a8 8 0 0 1 -8 -8 v-12 a8 8 0 0 1 8 -8 z" 
      fill={isDark ? "#f7fafc" : "#ffffff"}
      filter="url(#glow)"
      className="transition-colors duration-300"
    />
    
    {/* Message lines inside chat bubble */}
    <line x1="35" y1="45" x2="55" y2="45" stroke="url(#bgGradient)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="35" y1="50" x2="50" y2="50" stroke="url(#bgGradient)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="35" y1="55" x2="52" y2="55" stroke="url(#bgGradient)" strokeWidth="2.5" strokeLinecap="round" />
    
    {/* Multiple users indicator (enhanced) */}
    <g transform="translate(60, 25)" className="animate-float">
      <circle cx="0" cy="0" r="3.5" fill="url(#waveGradient)" filter="url(#glow)" />
      <circle cx="8" cy="3" r="3.5" fill="url(#waveGradient)" filter="url(#glow)" />
      <circle cx="3" cy="8" r="3.5" fill="url(#waveGradient)" filter="url(#glow)" />
    </g>
    
    {/* Send/broadcast arrow (enhanced) */}
    <path 
      d="M70 60 l8 -3 l-8 -3 l0 2 l-6 0 l0 2 l6 0 z" 
      fill={isDark ? "#f7fafc" : "#ffffff"} 
      filter="url(#glow)"
      className="transition-colors duration-300"
    />
    
    {/* Success checkmarks (enhanced) */}
    <g transform="translate(68, 45)" opacity="0.9">
      <path d="M0 3 l2 2 l4 -4" stroke="url(#waveGradient)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 3 l2 2 l4 -4" stroke="url(#waveGradient)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

const Logo = ({ className = "", showSubtitle = true }) => {
  const { isDark, isRTL, getAnimationClass, getRTLClass } = useTheme();

  return (
    <div className={`flex items-center gap-3 ${className} ${getRTLClass('', 'flex-row-reverse')}`}>
      <div className="relative">
        <LogoIcon 
          className={`
            w-12 h-12 sm:w-14 sm:h-14 transition-all duration-500 ease-out-quart
            ${getAnimationClass('hover:scale-110 hover:rotate-6')}
          `}
          isDark={isDark}
        />
        {/* Enhanced animated pulse ring */}
        <div className={`
          absolute inset-0 rounded-full border-2 
          border-light-primary-400/30 dark:border-dark-primary-500/40
          ${getAnimationClass('animate-pulse-soft')}
        `} />
        {/* Additional glow ring */}
        <div className={`
          absolute inset-1 rounded-full border border-light-accent-400/20 dark:border-dark-accent-500/30
          ${getAnimationClass('animate-pulse-soft')}
        `} style={{ animationDelay: '1s' }} />
      </div>
      
      <div className={`flex flex-col ${getRTLClass('items-start', 'items-end')}`}>
        <h1 className={`
          text-2xl sm:text-3xl font-bold bg-gradient-to-r 
          from-light-primary-600 via-light-accent-500 to-light-primary-500
          dark:from-dark-primary-400 dark:via-dark-accent-600 dark:to-dark-primary-300
          bg-clip-text text-transparent transition-all duration-500
          hover:from-light-primary-500 hover:via-light-accent-400 hover:to-light-primary-400
          dark:hover:from-dark-primary-300 dark:hover:via-dark-accent-500 dark:hover:to-dark-primary-200
          ${getAnimationClass('hover:scale-105')}
          ${getRTLClass('font-inter', 'font-primary')}
        `}>
          WA-Bulk
        </h1>
        {showSubtitle && (
          <p className={`
            text-xs sm:text-sm font-medium -mt-1 transition-all duration-300
            bg-gradient-to-r from-light-secondary-500 to-light-secondary-600
            dark:from-dark-secondary-400 dark:to-dark-secondary-300
            bg-clip-text text-transparent
            ${getRTLClass('text-left', 'text-right font-primary')}
          `}>
            {isRTL ? 'واتساب بالك' : 'Bulk WhatsApp'}
          </p>
        )}
      </div>
      
      {/* Enhanced decorative elements */}
      <div className={`
        hidden sm:flex items-center gap-1.5 
        ${getRTLClass('ml-3', 'mr-3')}
        ${getAnimationClass('animate-fade-in')}
      `}>
        <div className={`
          w-1.5 h-1.5 rounded-full bg-light-primary-500 dark:bg-dark-primary-400
          ${getAnimationClass('animate-pulse-soft')}
        `} />
        <div className={`
          w-1.5 h-1.5 rounded-full bg-light-accent-500 dark:bg-dark-accent-500
          ${getAnimationClass('animate-pulse-soft')}
        `} style={{animationDelay: '0.5s'}} />
        <div className={`
          w-1.5 h-1.5 rounded-full bg-light-success-500 dark:bg-dark-success-400
          ${getAnimationClass('animate-pulse-soft')}
        `} style={{animationDelay: '1s'}} />
      </div>
    </div>
  );
};

export default Logo;