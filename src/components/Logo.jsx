import React from 'react';

const LogoIcon = ({ className = "w-8 h-8 sm:w-10 sm:h-10" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={className}>
    <defs>
      {/* Gradient for main background */}
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#25D366"}} />
        <stop offset="50%" style={{stopColor:"#128C7E"}} />
        <stop offset="100%" style={{stopColor:"#075E54"}} />
      </linearGradient>
      
      {/* Gradient for broadcast waves */}
      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{stopColor:"#60A5FA"}} />
        <stop offset="100%" style={{stopColor:"#3B82F6"}} />
      </linearGradient>
      
      {/* Glow effect */}
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="blur" in2="SourceGraphic" operator="over" />
      </filter>
      
      {/* Drop shadow */}
      <filter id="dropshadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
      </filter>
    </defs>

    {/* Main circular background */}
    <circle cx="50" cy="50" r="45" fill="url(#bgGradient)" filter="url(#dropshadow)" />
    
    {/* Broadcast waves (representing bulk messaging) */}
    <g opacity="0.7">
      <path d="M15 30 Q25 20 35 30" stroke="url(#waveGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M10 35 Q25 20 40 35" stroke="url(#waveGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M8 40 Q25 22 42 40" stroke="url(#waveGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
    
    {/* Main chat bubble (WhatsApp style) */}
    <path d="M30 35 h25 a8 8 0 0 1 8 8 v12 a8 8 0 0 1 -8 8 h-18 l-7 6 v-6 a8 8 0 0 1 -8 -8 v-12 a8 8 0 0 1 8 -8 z" 
          fill="#FFFFFF" filter="url(#glow)" />
    
    {/* Message lines inside chat bubble */}
    <line x1="35" y1="45" x2="55" y2="45" stroke="#25D366" strokeWidth="2" strokeLinecap="round" />
    <line x1="35" y1="50" x2="50" y2="50" stroke="#25D366" strokeWidth="2" strokeLinecap="round" />
    <line x1="35" y1="55" x2="52" y2="55" stroke="#25D366" strokeWidth="2" strokeLinecap="round" />
    
    {/* Multiple users indicator (3 dots representing bulk) */}
    <g transform="translate(60, 25)">
      <circle cx="0" cy="0" r="3" fill="#FFD700" filter="url(#glow)" />
      <circle cx="8" cy="3" r="3" fill="#FFD700" filter="url(#glow)" />
      <circle cx="3" cy="8" r="3" fill="#FFD700" filter="url(#glow)" />
    </g>
    
    {/* Send/broadcast arrow */}
    <path d="M70 60 l8 -3 l-8 -3 l0 2 l-6 0 l0 2 l6 0 z" fill="#FFFFFF" filter="url(#glow)" />
    
    {/* Success checkmarks (double check like WhatsApp) */}
    <g transform="translate(68, 45)" opacity="0.8">
      <path d="M0 3 l2 2 l4 -4" stroke="#00D8FF" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 3 l2 2 l4 -4" stroke="#00D8FF" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

const Logo = ({ className = "", showSubtitle = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <LogoIcon className="w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-300 hover:scale-110" />
        {/* Animated pulse ring */}
        <div className="absolute inset-0 rounded-full border-2 border-green-400/30 animate-pulse"></div>
      </div>
      
      <div className="flex flex-col">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 
                     via-blue-500 to-cyan-400 bg-clip-text text-transparent
                     hover:from-green-300 hover:via-blue-400 hover:to-cyan-300 
                     transition-all duration-300">
          WA-Bulk
        </h1>
        {showSubtitle && (
          <p className="text-xs sm:text-sm text-gray-400 font-medium -mt-1
                      bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent">
            واتساب بالك
          </p>
        )}
      </div>
      
      {/* Decorative elements */}
      <div className="hidden sm:flex items-center gap-1 ml-2">
        <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse"></div>
        <div className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
    </div>
  );
};

export default Logo;