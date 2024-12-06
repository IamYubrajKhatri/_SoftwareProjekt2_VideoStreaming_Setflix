import React from 'react'

function Cards({ item }) {
  
  return (
    <>
    <div className='my-4 p-3'>
    <div className="card  bg-base-100 p-3 shadow-xl mx-1 hover:scale-105 duration-200">
  <figure>
    <img
      src={item.image}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{item.name}</h2>
    <p>{item.description}</p>
    <div className="card-actions justify-end">
    <button className="btn btn-error text-white hover:text-black">Play</button>
    </div>
  </div>
</div>
    </div>
   
    </>
  )
}

export default Cards
