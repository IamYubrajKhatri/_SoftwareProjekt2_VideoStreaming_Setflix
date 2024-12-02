import { fetchFromTMDB } from "../services/tmdb.service.js";
import User from "../model/user.model.js"

export async function getTrendingMovie(req,res) {
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/trending/movie/day?language=en-US`);
        
        const randomMovie= data.results[Math.floor(Math.random() * data.results?.length)];
        //results is a name of array i ve created
        //math.random sends number between 0 and 1
        //math.floor round the decimal into integer
        res.json({success:true,content:randomMovie});

    } catch (error) {
        res.status(500).json({ success: false, message:"Internal server Error while getting trending movie"});
    }
    
}

export async function getMovieTrailers(req,res){

    const { id } = req.params;
    //this avove req.params is an object in express that contains key value pair of the route parameters..such as id and values passed in url
    //{id} this uses object destructuring to extract the id paramaters from req.params
    //this id is defined in movie.routes.js

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
        //${id} is placeholder for id variable ,dynamically inserting its value in the url

        res.json({success:true, trailers:data.results})
    } catch (error) {
        if(error.message.includes("404")){
            // Return no content for 404
            return res.status(404).send(null);
        }

        res.status(500).json({ success:false,message: "Internal server errror by fetching trailer"});
        
    }
}

export async function getSimilarMovies(req,res) {
    const { id } = req.params;
    try {
        const data= await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        res.status(200).json({success:true,similar:data.results});
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }

        res.status(500).json({ success:false,message: "Internal server errror by fetching Similar movie"});
    }
}

export async function getMoviesByCategory(req,res) {
    const { category } = req.params;
    try {
        const data= await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        //now_playing,popular,top_rated,upcoming are the list of category
        res.status(200).json({success:true,content:data.results});
    } catch (error) {

        res.status(500).json({ success:false,message: "Internal server errror by fetching movie category"});
    }
}

export async function getMovieDetails(req,res) {
    const { id } = req.params;
    try {
        const data= await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.status(200).json({success:true,content:data});
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }

        res.status(500).json({ success:false,message: "Internal server errror by fetching Movie Details"});
    }
}

export async function addMovieToFavorite(req,res) {
    const{ movieId} = req.body;//for post ,pull method..it contains data that needs to proceess..this is a user input

    if (!movieId) {
        return res.status(400).json({ success: false, message: "Movie ID is required" });
    }

    try {

        const data= await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`);

        const user = await User.findById(req.user._id);
        const movieExistsInFavorites = user.favorite.some(fav => fav.movieId === data.id && fav.type==="Movie");//second part helps to diffrenciate between tv and movies with its unique type

        if (movieExistsInFavorites) {
            return res.status(409).json({ success: false, message: "Movie is already in your favorites" });
        }

        // Add the movie to the user's favorites list
        const newFavoriteMovie = {
            movieId: data.id,
            title: data.title,
            overview: data.overview,
            poster_path: data.poster_path,
            release_date: data.release_date,
            type:"Movie",
        };

        const result= await User.findByIdAndUpdate(req.user._id,{
            //to delete we use pull 
            $push:{favorite:newFavoriteMovie }
        });
        res.status(200).json({success: true,message: "Movie added to favorites successfully",movie: newFavoriteMovie});


    } catch (error) {
        console.error("Error adding movie to favorites:", error.message);
        res.status(500).json({success: false,message: "Internal server error while adding movie to favorites"});
    }

    
}

export async function removeMovieFromFavorite(req,res){

    //get movie from the url parms
    let { movieId } = req.params;
    //if there no movie rxisted
        if (!movieId || isNaN(movieId)) {
            return res.status(400).json({ success: false, message: "Invalid ID provided" });}
    //converting string to integer
        movieId = parseInt(movieId);
    try {
        const user = await User.findById(req.user._id);
        //this item.movieId===movieId means ..left side is the movie id of a array from database and right side is the id from url we are putting as variable
        const itemExists = user.favorite.some((item) => item.movieId === movieId && item.type==="Movie" );

        if (!itemExists) {
            return res.status(404).json({ success: false, message: "Item not found in Favorite List" });
        }
        const result= await User.findByIdAndUpdate(req.user._id,{
            //to delete we use pull 
            //movieId from right side is our created variable
            //movieId from left side is a object in database
            $pull:{favorite:{  movieId:movieId }}});
        if (!result) {
            return res.status(404).json({ success: false, message: "Item not found or already removed" });
        }
        res.status(200).json({ success:true ,message:"Item have been removed"});


    } catch (error) {
        console.error("Error removing movie from favorites:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
    

}