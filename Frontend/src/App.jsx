
import React from 'react'
import Home from './home/Home'
import Movies from './movies/Movies'
import VerifyEmail from './components/Emailverify'
import { Routes,Route } from "react-router-dom"
import Signup from './components/Signup'
import { Toaster } from 'react-hot-toast';



function App() {
  return (
    <>
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/movies' element={<Movies/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path="/verify-email" element={<VerifyEmail />} />
      
    </Routes>
    <Toaster/>
    </>
  )
}

export default App

