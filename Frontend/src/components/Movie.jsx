import React from 'react'
import Cards from './Cards'
import list from '../../public/list.json';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import useAuthCheck from './AuthCheck';


function Movie() {
  const isAuthenticated = useAuthCheck(); // Check if the user is authenticated
  // If the user is not authenticated, return a message or a redirect.
  if (isAuthenticated === false) {
    return (
      <div className="text-center mt-20">
        <h2>You are not authorized. Please log in to access this page.</h2>
      </div>
    );
  }
  // If the authentication status is still loading, we can display a loading message or spinner.
  if (isAuthenticated === null) {
    return (
      <div className="text-center mt-20">
        <h2>Loading...</h2>
      </div>
    );
  }
  const filterData=list.filter((data)=> data.price === "Free");
  const filterDataB=list.filter((data)=> data.price === "Buy");

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  {/* All for sliders*/}
  return (
    <>
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 bg-white'>
      <div>
      <h2 className='mt-20 text-center text-2xl font-bold '>Trending</h2>
      <div className=''>
      <Slider {...settings}>
      {filterDataB.map((item)=>(
          <Cards item={item} key={item.id}/> 
        ))}
        </Slider>
      </div>
      </div>
      <br />
      <br />
      <div>
      <h2 className=' text-center text-2xl font-bold '>Action</h2>
      <div className=''>
      <Slider {...settings}>
      {filterData.map((item)=>(
          <Cards item={item} key={item.id}/> 
        ))}
        </Slider>
      </div>
      </div>


    </div>
    </>
    
  )
}

export default Movie
