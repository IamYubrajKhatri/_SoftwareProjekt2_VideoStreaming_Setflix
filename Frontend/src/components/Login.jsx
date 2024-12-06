import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <>
      
      <div>
      <dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Login</h3>

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
        <button className="btn btn-error  text-white hover:text-black  ">Login</button>
        <p className='py-3'>Have an account? {" "} 
          <Link to="/signup" 
          className='underline text-blue-500 cursor-pointer  '
          >
            Signup</Link>{" "}
            
            </p>
           
     </div>
  </div >
</dialog>
      </div>
    </>
  )
}

export default Login
