import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'

export default function App() {
  const [count, setCount] = useState(0)
  const [useForm, setUseForm] = useState(false);


  return (
    <>
      {useForm ? <Register /> : <div><Login /> <p>Dont Have Account? <button onClick={() => setUseForm(true)}>Register</button></p></div>}
    </>
  )
}