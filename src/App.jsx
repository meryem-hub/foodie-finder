import React from "react"
import {  Routes, Route } from "react-router-dom"

import Header from "./components/Header"
import Favorites from "./components/Favorite"

function App() {
  return (
    <>
    <Header/>
      <Routes>
       
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
    
  )
}

export default App
