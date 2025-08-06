import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import SearchBar from "./SearchBar";
import {
  getCategories,
  getCountries,
  getMealsByCategory,
} from "../services/mealApi";

function Header() {
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [showCountries, setShowCountries] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const catagoryData = await getCategories();
      setCategories(catagoryData);
      const countryData = await getCountries();
      setCountries(countryData);
    };
    fetchData();
  }, []);

  const handleCategoryClick = async (cat) => {
    setShowCategories(false);
    setMobileMenuOpen(false);
    const meals = await getMealsByCategory(cat);
    navigate("/recipes", { state: { meals, title: `Category: ${cat}` } });
  };

  const handleCountryClick = (country) => {
    setShowCountries(false);
    setMobileMenuOpen(false);
    navigate(`/?search=${country}`);
  };

  return (
    <>
      <div className="bg-white border border-b-[#FFD700] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">
          {/* Logo */}
          <Link to="/" className="text-3xl font-extrabold text-[#FFD700]">
            <span className="text-gray-800">Foodie</span>Finder
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 text-gray-600 font-medium relative items-center">
            <Link to="/" className="hover:text-[#FFD700]">
              Home
            </Link>

            {/* Category */}
            <div>
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="w-full text-left hover:text-orange-500"
              >
                Category
              </button>
             
            </div>

            {/* Country */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowCountries(!showCountries);
                  setShowCategories(false);
                }}
                className="hover:text-[#FFD700]"
              >
                Country
              </button>
              {showCountries && (
                <div
                  className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded p-3 overflow-y-auto z-50"
                  style={{ maxHeight: "300px" }}
                >
                  {countries.map((c) => (
                    <button
                      key={c.strArea}
                      onClick={() => handleCountryClick(c.strArea)}
                      className="block w-full text-left px-2 py-1 hover:bg-orange-100 rounded"
                    >
                      {c.strArea}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link to="/favorites" className="hover:text-orange-500">
              Favorites
            </Link>
          </nav>
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg p-4 space-y-4">
            <Link
              to="/"
              className="block hover:text-orange-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <div>
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="w-full text-left hover:text-orange-500"
              >
                Category
              </button>
              {showCategories && (
                <div className="mt-2 flex flex-wrap gap-4">
                  {categories.map((cat) => (
                    <div
                      key={cat.idCategory}
                      onClick={() => handleCategoryClick(cat.strCategory)}
                      className="cursor-pointer flex flex-col items-center hover:scale-105 transition"
                    >
                      <img
                        src={cat.strCategoryThumb}
                        alt={cat.strCategory}
                        className="w-16 h-16 object-cover rounded-full border"
                      />
                      <p className="text-xs mt-1">{cat.strCategory}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setShowCountries(!showCountries)}
                className="w-full text-left hover:text-orange-500"
              >
                Country
              </button>
              {showCountries && (
                <div className="mt-2 mx-5 shadow flex flex-col gap-1 max-h-40 overflow-y-auto">
                  {countries.map((c) => (
                    <button
                      key={c.strArea}
                      onClick={() => handleCountryClick(c.strArea)}
                      className="text-left hover:bg-orange-100 rounded px-2 py-1"
                    >
                      {c.strArea}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/favorites"
              className="block hover:text-orange-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Favorites
            </Link>
          </div>
        )}

        
      </div>
       {showCategories && (
                <div className="bg-gray-50 border-t px-4 py-4 overflow-x-auto flex gap-4">
                  {categories.map((cat) => (
                    <div
                      key={cat.idCategory}
                      onClick={() => handleCategoryClick(cat.strCategory)}
                      className="cursor-pointer flex flex-col items-center hover:scale-105 transition"
                    >
                      <img
                        src={cat.strCategoryThumb}
                        alt={cat.strCategory}
                        className="w-20 h-20 object-cover rounded-full border"
                      />
                      <p className="text-sm mt-2">{cat.strCategory}</p>
                    </div>
                  ))}
                </div>
              )}
      <div className="block md:hidden m-2">
        <SearchBar />
      </div>
    </>
  );
}

export default Header;
