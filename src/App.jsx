import { useState } from 'react'
import './App.css'
import Login from './login'
import Dashboard from './Component/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>  
      <Dashboard />
    </> 
  )
}

export default App
