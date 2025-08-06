import React from 'react';
import { Search, Globe, Clock } from 'lucide-react';

const HomepageStats = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <h2 className="text-xl md:text-2xl font-semibold mb-2">Discover delicious meals from around the world.</h2>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Search by ingredient, browse categories, or find your next favorite dish from our collection of thousands of recipes!
      </p>

      {/* Quick Search Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <span className="bg-gray-100 text-gray-800 rounded-full px-4 py-2 text-sm font-medium">Quick searches:</span>
        <button className="bg-white hover:bg-yellow-100 text-yellow-600 font-medium py-2 px-4 rounded-full border border-yellow-300 transition-colors">
          Chicken
        </button>
        <button className="bg-white hover:bg-yellow-100 text-yellow-600 font-medium py-2 px-4 rounded-full border border-yellow-300 transition-colors">
          Pasta
        </button>
        <button className="bg-white hover:bg-yellow-100 text-yellow-600 font-medium py-2 px-4 rounded-full border border-yellow-300 transition-colors">
          Beef
        </button>
        <button className="bg-white hover:bg-yellow-100 text-yellow-600 font-medium py-2 px-4 rounded-full border border-yellow-300 transition-colors">
          Dessert
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-yellow-100 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <Search className="w-12 h-12 text-yellow-500 mb-4" />
          <h3 className="text-2xl font-bold text-gray-800">1000+ Recipes</h3>
          <p className="text-gray-600">From around the world</p>
        </div>

        <div className="bg-orange-100 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <Globe className="w-12 h-12 text-orange-500 mb-4" />
          <h3 className="text-2xl font-bold text-gray-800">25+ Countries</h3>
          <p className="text-gray-600">International cuisine</p>
        </div>

        <div className="bg-red-100 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <Clock className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-2xl font-bold text-gray-800">Step-by-step</h3>
          <p className="text-gray-600">Detailed instructions</p>
        </div>
      </div>
    </div>
  );
};

export default HomepageStats;