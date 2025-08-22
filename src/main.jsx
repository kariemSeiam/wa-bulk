// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import WhatsAppDashboard from './WhatsAppDashboard.jsx'
import { ThemeProvider } from '../contexts/ThemeContext.jsx'
import './index.css'

// Performance optimization: Preload critical fonts
const preloadFonts = () => {
  const fonts = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
    'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap'
  ];
  
  fonts.forEach(fontUrl => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = fontUrl;
    document.head.appendChild(link);
  });
};

// Performance optimization: Optimize viewport for mobile
const optimizeViewport = () => {
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover';
  }
};

// Initialize performance optimizations
preloadFonts();
optimizeViewport();

// Add skip to main content for accessibility
const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.className = 'skip-to-main';
skipLink.textContent = 'Skip to main content';
document.body.insertBefore(skipLink, document.body.firstChild);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <div id="main-content">
        <WhatsAppDashboard />
      </div>
    </ThemeProvider>
  </React.StrictMode>,
)