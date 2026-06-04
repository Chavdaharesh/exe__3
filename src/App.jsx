import { useState } from 'react'
import './App.scss'
import Login from './login'
import Dashboard from './Component/Dashboard'
import Recipe from './Component/Recipe'
import BaseComponent from "bootstrap/js/dist/base-component";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/recipe/:id" element={<Recipe />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
