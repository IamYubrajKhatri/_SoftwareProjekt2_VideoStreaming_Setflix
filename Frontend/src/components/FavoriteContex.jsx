import  { createContext, useState, useContext, useEffect } from "react";

//This file is the backbone for managing the favorite list. It uses React’s Context API to create a shared state across components.
//context provide a global state for storing and managing movies

// Create Context to share state
const FavoriteContext = createContext();

// Hook to use the context
//A utility function that allows other components to easily access the FavoriteContext without needing to call useContext(FavoriteContext) directly.
export const useFavorite = () => useContext(FavoriteContext);


//we wrap our whole app and route in app.jsx with this to  make sure its acciable to eveery child component
// Provider Component
export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(()=>{
    // Initialize state from localStorage, or default to an empty array
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // Add or remove a movie from the favorites list
  const toggleFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.find((item) => item.id === movie.id);
      let updatedFavorites;

      if (isFavorite) {
        // Remove from favorites
        updatedFavorites = prevFavorites.filter((item) => item.id !== movie.id);
      } else {
        // Add to favorites
         updatedFavorites=[...prevFavorites, movie];
      }
      // Save the updated favorites to localStorage
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      return updatedFavorites;
    });
  };


   // Use Effect to sync state to localStorage on initial load
   useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);


  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
