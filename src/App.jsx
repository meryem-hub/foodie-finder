import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import RecipesPage from '@/pages/RecipesPage';
import HeroSection from './components/Hero';
import MealDetail from './pages/MealDetail';
import FavoritesPage from './pages/FavoritesPage';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';

import { FavoriteMealsContextProvider } from './contexts/FavouriteMealsContext';

function App() {
  return (
    <Router>
      <FavoriteMealsContextProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
          <Routes>
            <Route path="/" element={
              <>
              <HeroSection />
              <Home />
            </>
          } />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/meals/:id" element={<MealDetail />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
      <Footer/>
      </FavoriteMealsContextProvider>
    </Router>
  );
}

export default App;
