import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { div } from '@tensorflow/tfjs'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div className='flex justify-between'>
    <h1 className='bg-red-300'>hello world</h1>
    <h1 className='bg-red-300'>hello world</h1>
    <h1 className='bg-red-300'>hello world</h1>
   </div>
  )
}

export default App
