import React from 'react'
import Login from './Login'
import { Link } from 'react-router-dom'



function Signup() {
  return (
    <>
      <div className='flex h-screen items-center justify-center border shadow-md'>
      <div  className=" border shadow-xl rounded-xl p-5">
  <div className=" ">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute md:right-60 lg:right-96 xl:right-2 right-12 top xl:top-2">✕</Link>
    </form>
    <h3 className="font-bold text-lg">Signup</h3>
    <div className='mt-4 space-y-2 py-1'>
    <span>Username</span>
    <br />
    <input type='text' placeholder='Please enter Username' className='w-80 px-10 py-3 border rounded-md outline-none'/>
   </div>
   <div className='mt-4 space-y-2 py-1'>
    <span>Email</span>
    <br />
    <input type='email' placeholder='Please enter your Email' className='w-80 px-10 py-3 border rounded-md outline-none'/>
   </div>
   <div className='mt-4 space-y-2 py-1'>
    <span>Password</span>
    <br />
    <input type='email' placeholder='Please enter your Password' className='w-80 px-10 py-3 border rounded-md outline-none'/>
   </div>
     {/* Button */}
     <div className='flex justify-around mt-4'>
        <button className="btn btn-error  text-white hover:text-black  ">Signup</button>
        <p className="text-xl">
                  Have account?{" "}
                  <button
  className="underline text-blue-500 cursor-pointer"
  onClick={() => document.getElementById("my_modal_3").showModal()}
>
  Login
</button>{" "}
                  <Login />
                </p>

     </div>
  </div>
</div>
      </div>
    </>
  )
}

export default Signup
