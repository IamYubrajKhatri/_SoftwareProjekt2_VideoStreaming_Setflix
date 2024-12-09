import React from 'react'
import useAuthCheck from './AuthCheck';
import Cards from './Cards';
import { useFavorite } from './FavoriteContex';

function Favourite() {
     useAuthCheck();

     const { favorites } = useFavorite();

  if (favorites.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2>Your favorites list is empty.</h2>
      </div>
    );
  }
     
  return (
    <>
    <div className='max-w-screen-2xl container mx-auto  md:px-20 px-4 bg-white m-20'>
        <h2 className=' text-2xl font-bold text-center  '>Your Favourites</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {favorites.map((item) => (
          <Cards key={item.id} item={item} />
        ))}
      </div>
        
    </div>
      
    </>
  )
}

export default Favourite
