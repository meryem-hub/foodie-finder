<Search />
import React, { useState } from "react"
import { Input } from "./ui/input"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"

function SearchBar() {

   const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm}`)
    }
  }
  return (
    <form  onSubmit={handleSubmit}  className="w-full md:w-auto">
      <div className="relative w-full md:w-[300px] rounded-full border hover:border-orange-500 ">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <Search className="text-xl"/>
        </span>
        <Input
          type="search"
          placeholder="Search meals..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}  
        />
      </div>
    </form>
  )
}

export default SearchBar

