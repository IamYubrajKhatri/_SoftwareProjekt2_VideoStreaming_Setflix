
import React from 'react'
import Home from './home/Home'
import Movies from './movies/Movies'
import { Routes,Route } from "react-router-dom"
import Signup from './components/Signup'




function App() {
  return (
    <>
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/movies' element={<Movies/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </>
  )
}

export default App

