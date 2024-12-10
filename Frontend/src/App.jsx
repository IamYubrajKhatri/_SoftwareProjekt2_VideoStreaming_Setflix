
import React from 'react'
import Home from './home/Home'
import Movies from './movies/Movies'
import VerifyEmail from './components/Emailverify'
import { Routes,Route } from "react-router-dom"
import Signup from './components/Signup'
import { Toaster } from 'react-hot-toast';
import ResetPassword from './components/Resetpassword'
import ForgetPassword from './components/Forgetpassword'
import Favourites from './favourite/Favourites'
// Import the FavoriteProvider
import { FavoriteProvider } from './components/FavoriteContex'
import Videoplayer from './Videoplayer/Videoplayer'

import { useParams } from 'react-router-dom';

function App() {

  const { userId } = useParams(); // Use useParams to get userId from URL

  console.log(userId); // This should now work
  return (
    <>
    {/* Wrap everything in the FavoriteProvider */}
    {/* The FavoriteProvider wraps the entire application so that components like Movies and Favourites can access the global favorite list.*/} 


    <FavoriteProvider>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/movies' element={<Movies/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/forget-password' element={<ForgetPassword/>}/>
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path='/reset-password' element={<ResetPassword/>}/>
      <Route path='/favourites' element={<Favourites/>}/>
      <Route path='/video-player/:id' element={<Videoplayer/>}/>
      
    </Routes>

    </FavoriteProvider>
    <Toaster/>
    </>
  )
}

export default App

