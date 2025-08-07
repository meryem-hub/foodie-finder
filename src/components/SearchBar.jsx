// SearchBar.jsx (same as before)
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm) {
      navigate(`/?search=${encodeURIComponent(trimmedTerm)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-auto">
      <div className="relative w-full md:w-[300px] rounded-full border border-gray-300 hover:border-[#FFD700] focus-within:border-[#FFD700] transition">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <Search className="w-5 h-5" />
        </span>
        <Input
          type="search"
          placeholder="Search by name and ingredient"
          aria-label="Search category"
          className="pl-10 border-none focus:ring-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </form>
  );
}

export default SearchBar;
