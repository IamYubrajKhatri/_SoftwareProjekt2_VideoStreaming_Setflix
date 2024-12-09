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
