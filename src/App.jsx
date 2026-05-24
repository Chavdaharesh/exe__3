import { useState } from 'react'
import './App.scss'
import Login from './login'
import Dashboard from './Component/Dashboard'
import BaseComponent from "bootstrap/js/dist/base-component";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>  
      <Dashboard />
    </> 
  )
}

export default App
