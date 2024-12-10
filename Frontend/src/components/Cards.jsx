import React from 'react'
import { Heart } from 'lucide-react';
import { useFavorite } from "./FavoriteContex";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function Cards({ item }) {


  const { favorites, toggleFavorite } = useFavorite();
  const isFavorite = favorites.some((fav) => fav._id === item._id);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

 

  const handleFavoriteClick = async () => {
    setIsLoading(true); // Start loading (disable UI actions during API call)
    try {
      // Make API call to add the movie to the user's favorites in the database
      const response = await axios.post(
        ' http://localhost:4001/api/movies/favorites', 
        { movieId: item._id }, // Send movieId in the body
        { withCredentials: true } // Ensure the cookie is sent with the request
      );
  
      if (response.status === 200) {
        console.log("Movie added to favorites");
        // Update local favorites state if necessary
        toggleFavorite(item); // Assuming toggleFavorite updates the context with the new favorite
      } else {
        console.error("Failed to add favorite");
      }
    } catch (error) {
      console.error("Error saving favorite:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  



  const heartIcon = (<>
    <div className="">
      <button className="btn btn-error"  >
        <Heart size={20} color={isFavorite ? "black" : "white"} />
      </button>
      </div>
      </> );
  
  return (
    <>
    <div className='my-4 p-3'>
    <div className="card  bg-base-300 p-3 shadow-xl mx-1 hover:scale-105 duration-200">
  <figure>
    <img
      src={item.image}
      alt="Imagemovie" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{item.name}</h2>
    <p>{item.description}</p>
    <div className="card-actions justify-between">
    <button className= "hover:text-black "aria-label="Add to favorites"
             onClick={handleFavoriteClick}
             disabled={isLoading}
             >{ heartIcon }</button>
    <button className="btn btn-error text-white hover:text-black" 
     onClick={() =>  navigate(`/video-player/${item._id}`, { state: { movie: item } })}>
      Play</button>
    </div>
    
  </div>
</div>
    </div>
   
    </>
  )
}

export default Cards;