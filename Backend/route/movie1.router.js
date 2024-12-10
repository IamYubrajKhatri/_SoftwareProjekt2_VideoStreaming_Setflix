import express from "express";
import { getAllMovies,getMovieById,addMovie,deleteMovie,updateMovie, addMovieToFavorite, getUserFavorite,deleteMovieFromUserFavorite } from "../controller/movie1.controller.js";
const router = express.Router();

// Routes
router.get('/',getAllMovies); // Fetch all movies
router.get('/:id',getMovieById); // Fetch a specific movie by ID
router.post('/', addMovie); // Add a new movie
router.put('/:id', updateMovie); // Update a movie
router.delete('/:id', deleteMovie); // Delete a movie
router.post('/:userId/favorites',addMovieToFavorite)//add movie to favourite
router.get('/:userId/favorites',getUserFavorite)//show all favourite
router.delete('/:userId/favorites',deleteMovieFromUserFavorite)//delete a movie fromfavourite
export default router;
