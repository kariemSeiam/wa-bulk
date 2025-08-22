import React from 'react';
import { Loader2, Sparkles, Zap, Check } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

// Modern Skeleton Card Component
export const SkeletonCard = () => {
  const { getAnimationClass, getTransitionClass } = useTheme();
  
  return (
    <div className={`
      bg-surface-primary/80 border border-light/30 dark:border-dark-border-light/30
      rounded-4xl overflow-hidden backdrop-blur-glass p-8
      ${getAnimationClass('animate-shimmer')}
    `}>
      {/* Status indicator skeleton */}
      <div className="absolute top-4 right-4 w-20 h-6 bg-surface-secondary rounded-full animate-shimmer" />
      
      <div className="space-y-6 pt-8">
        {/* Title skeleton */}
        <div className="space-y-3">
          <div className="h-6 bg-surface-secondary rounded-2xl w-3/4 animate-shimmer" />
          <div className="h-4 bg-surface-secondary rounded-2xl w-1/2 animate-shimmer" />
        </div>
        
        {/* Price badge skeleton */}
        <div className="w-32 h-8 bg-surface-secondary rounded-full animate-shimmer" />
        
        {/* Contact info skeletons */}
        <div className="space-y-4">
          <div className="h-14 bg-surface-secondary rounded-3xl animate-shimmer" />
          <div className="h-14 bg-surface-secondary rounded-3xl animate-shimmer" />
        </div>
        
        {/* Action button skeleton */}
        <div className="h-14 bg-surface-secondary rounded-3xl animate-shimmer" />
      </div>
    </div>
  );
};

// Modern Loading Spinner Component
export const LoadingSpinner = ({ size = 'medium', text = 'جاري التحميل...', className = '' }) => {
  const { getAnimationClass, isDark } = useTheme();
  
  const sizes = {
    small: { spinner: 'w-6 h-6', text: 'text-sm', gap: 'gap-3' },
    medium: { spinner: 'w-8 h-8', text: 'text-base', gap: 'gap-4' },
    large: { spinner: 'w-12 h-12', text: 'text-lg', gap: 'gap-5' }
  };
  
  const sizeConfig = sizes[size] || sizes.medium;
  
  return (
    <div className={`flex items-center justify-center ${sizeConfig.gap} ${className}`}>
      <div className="relative">
        {/* Main spinner */}
        <Loader2 className={`
          ${sizeConfig.spinner} animate-spin text-light-primary-500 dark:text-dark-primary-400
        `} />
        
        {/* Glow effect */}
        <div className={`
          absolute inset-0 ${sizeConfig.spinner} blur-md opacity-50
          text-light-primary-400 dark:text-dark-primary-500
          ${getAnimationClass('animate-pulse-soft')}
        `}>
          <Loader2 className="w-full h-full animate-spin" />
        </div>
        
        {/* Outer ring */}
        <div className={`
          absolute inset-0 ${sizeConfig.spinner} border-2 border-light-primary-200/30 dark:border-dark-primary-600/30 
          rounded-full ${getAnimationClass('animate-pulse-soft')}
        `} />
      </div>
      
      {text && (
        <span className={`${sizeConfig.text} font-semibold text-primary`}>
          {text}
        </span>
      )}
    </div>
  );
};

// Full Screen Loading Component
export const FullScreenLoading = ({ message = 'جاري التحميل...', subMessage = 'يرجى الانتظار قليلاً' }) => {
  const { getAnimationClass, isDark } = useTheme();
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-surface-primary/95 border border-light/30 dark:border-dark-border-light/30 rounded-4xl p-12 shadow-glass-strong backdrop-blur-glass max-w-md mx-4">
        <div className="text-center space-y-6">
          {/* Enhanced loading animation */}
          <div className="relative mx-auto w-20 h-20">
            {/* Main spinner */}
            <Loader2 className="w-full h-full animate-spin text-light-primary-500 dark:text-dark-primary-400" />
            
            {/* Multiple glow layers */}
            <div className="absolute inset-0 w-full h-full blur-xl opacity-30 animate-pulse-soft">
              <Loader2 className="w-full h-full animate-spin text-light-primary-400 dark:text-dark-primary-500" />
            </div>
            
            {/* Sparkle effects */}
            {!getAnimationClass('') && (
              <>
                <div className={`absolute -top-2 -right-2 w-2 h-2 bg-light-accent-400 dark:bg-dark-accent-400 rounded-full ${getAnimationClass('animate-pulse-soft')}`} />
                <div className={`absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-light-success-400 dark:bg-dark-success-400 rounded-full ${getAnimationClass('animate-pulse-soft')}`} style={{ animationDelay: '0.5s' }} />
                <div className={`absolute top-1/2 -left-3 w-1 h-1 bg-light-primary-400 dark:bg-dark-primary-400 rounded-full ${getAnimationClass('animate-pulse-soft')}`} style={{ animationDelay: '1s' }} />
              </>
            )}
            
            {/* Outer progress ring */}
            <div className={`
              absolute inset-0 w-full h-full border-4 border-light-primary-200/20 dark:border-dark-primary-600/20 
              rounded-full ${getAnimationClass('animate-pulse-soft')}
            `} />
          </div>
          
          {/* Loading text */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-primary">
              {message}
            </h3>
            <p className="text-secondary font-medium">
              {subMessage}
            </p>
          </div>
          
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2">
            <div className={`w-2 h-2 rounded-full bg-light-primary-500 dark:bg-dark-primary-400 ${getAnimationClass('animate-bounce-soft')}`} />
            <div className={`w-2 h-2 rounded-full bg-light-primary-500 dark:bg-dark-primary-400 ${getAnimationClass('animate-bounce-soft')}`} style={{ animationDelay: '0.2s' }} />
            <div className={`w-2 h-2 rounded-full bg-light-primary-500 dark:bg-dark-primary-400 ${getAnimationClass('animate-bounce-soft')}`} style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton Grid Component
export const SkeletonGrid = ({ count = 8 }) => {
  const { getAnimationClass } = useTheme();
  
  return (
    <div className="space-y-8" dir="rtl">
      {/* Filter skeleton */}
      <div className="flex gap-3 overflow-hidden">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-14 w-32 bg-surface-secondary rounded-3xl animate-shimmer" />
        ))}
      </div>
      
      {/* Cards skeleton grid */}
      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: count }, (_, index) => (
          <div
            key={index}
            className={getAnimationClass('animate-fade-in-up')}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <SkeletonCard />
          </div>
        ))}
      </div>
    </div>
  );
};

// Success Animation Component
export const SuccessAnimation = ({ message = 'تم بنجاح!', onComplete }) => {
  const { getAnimationClass } = useTheme();
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`
        bg-surface-primary/95 border border-light/30 dark:border-dark-border-light/30 
        rounded-4xl p-8 shadow-glass-strong backdrop-blur-glass
        ${getAnimationClass('animate-scale-in')}
      `}>
        <div className="text-center space-y-4">
          {/* Success checkmark with animation */}
          <div className="relative mx-auto w-16 h-16">
            <div className="w-full h-full bg-gradient-to-br from-light-success-500 to-light-success-600 dark:from-dark-success-600 dark:to-dark-success-700 rounded-full flex items-center justify-center shadow-glow">
              <Check className="w-8 h-8 text-white animate-bounce-soft" />
            </div>
            
            {/* Ripple effect */}
            <div className={`
              absolute inset-0 w-full h-full border-4 border-light-success-300/50 dark:border-dark-success-500/50 
              rounded-full ${getAnimationClass('animate-ping')}
            `} />
          </div>
          
          <p className="text-lg font-bold text-primary">{message}</p>
        </div>
      </div>
    </div>
  );
};

// Progress Bar Component
export const ProgressBar = ({ progress = 0, className = '' }) => {
  const { getAnimationClass } = useTheme();
  
  return (
    <div className={`w-full bg-surface-secondary/50 rounded-full h-3 overflow-hidden ${className}`}>
      <div 
        className={`
          h-full bg-gradient-to-r from-light-primary-500 via-light-primary-600 to-light-primary-700
          dark:from-dark-primary-600 dark:via-dark-primary-700 dark:to-dark-primary-800
          rounded-full transition-all duration-500 ease-out relative overflow-hidden
          ${getAnimationClass('animate-shimmer')}
        `}
        style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>
    </div>
  );
};