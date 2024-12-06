

import React from 'react'

function Banner() {
  return (
    <>
<div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col lg:flex-row lg:my-10 mb-8 mt-20 ">
    {/* left part*/}
   <div className="order-2 lg:order-1 lg:w-1/2 mt-12 lg:mt-32  ">
   <div className='space-y-6'>
    <h1 className="text-4xl font-bold">Hello,Welcome to Setflix.Enjoy new <span className='text-red-400'>Movies and Series!!</span> </h1>
    <p className='text-xl'>Step into the world of Setflix and stream unlimited movies and series anytime, anywhere! Enjoy exclusive content and seamless viewing across your devices. Sign up now and start your ultimate entertainment experience today. Don’t miss out!</p>

    {/* Email*/}
    <label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input type="text" className="grow" placeholder="Email" />
</label>
</div>
<button className="btn btn-error  text-white hover:text-black mt-5">Signup</button>
   </div>


{/* right part*/}
    <div className="order-1 lg:order-2 lg:w-1/2 lg:mt-32">
    <img src="background1.jpg" className='' alt="" />
    </div>
     
    </div>


    </>
  )
}

export default Banner
