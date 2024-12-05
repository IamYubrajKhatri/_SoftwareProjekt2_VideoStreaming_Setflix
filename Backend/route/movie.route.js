import express from "express";

import { getTrendingMovie ,getMovieTrailers ,getMovieDetails,getSimilarMovies,getMoviesByCategory, addMovieToFavorite, removeMovieFromFavorite,getVisibleVideos} from "../controller/movie.controller.js";

const router = express.Router();

router.get("/trending",getTrendingMovie) ;
router.get("/:id/trailers",getMovieTrailers);
router.get("/:id/similar",getSimilarMovies)
router.get("/:category",getMoviesByCategory)
router.get("/:id/details",getMovieDetails);
router.post("/:id/details/addToFavorite",addMovieToFavorite);
router.delete("/:movieId/details/removeFromFavorite",removeMovieFromFavorite);
//id is a route paramater that acts as a placeholder for a dynamic value(eg a movie unique identifier)

router.get("/visible-videos", getVisibleVideos);
export default router;