
// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import RecipesPage from '@/pages/RecipesPage';
import Header from './components/Header';
import Favorites from './components/Favorite';


function App() {
  return (
   
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
   
  );
}

export default App;

