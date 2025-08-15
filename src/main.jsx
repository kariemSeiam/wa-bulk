// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import { ThemeProvider } from '../contexts/ThemeContext.jsx';
import WhatsAppDashboard from './WhatsAppDashboard.jsx';

const App = () => {
  return (
    <StrictMode>
      <ThemeProvider>
        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        
        <main id="main-content" className="min-h-screen bg-surface-primary">
          <WhatsAppDashboard />
        </main>
      </ThemeProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<App />);