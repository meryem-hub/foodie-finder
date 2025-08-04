import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import SearchBar from "./SearchBar"
import { getCategories, getCountries } from "../services/mealApi"

function Header() {
  const [categories, setCategories] = useState([])
  const [countries, setCountries] = useState([])
  const [showCategories, setShowCategories] = useState(false)
  const [showCountries, setShowCountries] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data.categories || []))
    getCountries().then((res) => setCountries(res.data.meals || []))
  }, [])

  const handleCategoryClick = (cat) => {
    navigate(`/?search=${cat}`)
    setShowCategories(false)
  }

  const handleCountryClick = (country) => {
    navigate(`/?search=${country}`)
    setShowCountries(false)
  }

  return (
    <>
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between relative">
          {/* Logo */}
          <Link to="/" className="text-4xl font-extrabold text-orange-500">
            <span className="text-gray-800">Foodie</span>Finder
          </Link>

          {/* Nav */}
          <nav className="flex gap-6 text-gray-600 font-medium relative">
            <Link to="/" className="hover:text-orange-500">Home</Link>

            {/* Category Button */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowCategories(!showCategories)
                  setShowCountries(false)
                }}
                className="hover:text-orange-500"
              >
                Category
              </button>
            </div>

            {/* Country Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowCountries(!showCountries)
                  setShowCategories(false)
                }}
                className="hover:text-orange-500"
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

            <Link to="/favorites" className="hover:text-orange-500">Favorites</Link>
          </nav>

          {/* Search Bar */}
          <SearchBar />
        </div>

        {/* Category Horizontal Scroll */}
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
      </div>
    </>
  )
}

export default Header
