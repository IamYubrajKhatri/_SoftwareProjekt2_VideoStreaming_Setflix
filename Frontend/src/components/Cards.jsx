import React from 'react'
import { Heart } from 'lucide-react';
import { useFavorite } from "./FavoriteContex";
import { useNavigate } from 'react-router-dom';

function Cards({ item }) {


  const { favorites, toggleFavorite } = useFavorite();
  const isFavorite = favorites.some((fav) => fav.id === item.id);
  const navigate = useNavigate();

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
              onClick={() => toggleFavorite(item)}>{ heartIcon }</button>
    <button className="btn btn-error text-white hover:text-black" 
     onClick={() =>  navigate("/video-player", { state: { movie: item } })}>
      Play</button>
    </div>
    
  </div>
</div>
    </div>
   
    </>
  )
}

export default Cards;




