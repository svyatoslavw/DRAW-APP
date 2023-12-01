import { useState } from 'react'
import './App.css'
import Canvas from './components/Canvas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <Canvas width={1280} height={720} />
    </div>
  )
}

export default App
