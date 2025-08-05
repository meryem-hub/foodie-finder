import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import RecipesPage from '@/pages/RecipesPage';
import HeroSection from './components/Hero';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
        {/* HeroSection should be placed either in your Home component or here with routes */}
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <Home />
            </>
          } />
          <Route path="/recipes" element={<RecipesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;