import User from "../model/user.model.js"


import Movie from "../model/movie.model.js";

// Get all movies
export async function getAllMovies(req, res) {
  try {
    const movies = await Movie.find(); // Fetch all movies from MongoDB
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get single movie
export async function getMovieById(req, res)  {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //add a new movie
  export async function addMovie(req, res)  {
    try {
        const newMovie = new Movie(req.body);
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
  };

  // Delete a movie by ID
export async function deleteMovie (req, res) {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Update a movie by ID
export  async function updateMovie(req, res) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Return the updated document
        runValidators: true, // Validate the update data against the schema
      });
      if (!updatedMovie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.status(200).json(updatedMovie);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  export async function addMovieToFavorite(req,res){
  const { userId } = req.params;
    //data comes from url,used to capture a dynamic segment in url like _id
  const { movieId } = req.body;
  //data comes from response of a body,uded to send data via HTTP method
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    //user.favourite is a array,include(movieId) checks  if movieId already exists in the array,!means no ---if there is no movie id in the array 
    if (!user.favorite.includes(movieId)) {
      user.favorites.push(movieId); // Add movieId to the favorites array
      await user.save();
    }

    res.status(200).json({ message: 'Favorite added successfully', favorite: user.favorites });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add favorite' });
  }

  }

  export async function getUserFavorite(req,res){
    try {
      const { userId } = req.params;
  
      const user = await User.findById(userId).populate('favorites'); // Populate movie details
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ favorites: user.favorites });
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving favorites', error: error.message });
    }
  }
  export async function deleteMovieFromUserFavorite(req,res){
    try {
      const { userId } = req.params;
      const { movieId } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Remove movie from favorites
      user.favorites = user.favorites.filter(fav => fav.toString() !== movieId);
      await user.save();
      return res.status(200).json({ favorites: user.favorites });
    } catch (error) {
      return res.status(500).json({ message: 'Error removing movie from favorites', error: error.message });
    }
  }

