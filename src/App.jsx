import { useState } from 'react'
import './App.scss'
import Login from './login'
import Dashboard from './Component/Dashboard'
import BaseComponent from "bootstrap/js/dist/base-component";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Dashboard />} />
        </Route>      
      </Routes>
    </BrowserRouter>
  )
}

export default App
