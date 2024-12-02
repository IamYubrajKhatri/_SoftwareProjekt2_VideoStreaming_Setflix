import { fetchFromTMDB } from "../services/tmdb.service.js";
import User from "../model/user.model.js"

export async function getTrendingTv(req,res) {
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/trending/tv/day?language=en-US`);
        
        const randomTv= data.results[Math.floor(Math.random() * data.results?.length)];
        res.json({success:true,content:randomTv});

    } catch (error) {
        res.status(500).json({ success: false, message:"Internal server Error while getting trending tv"});
    }
    
}

export async function getTvTrailers(req,res){

    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)
        res.json({success:true, trailers:data.results})
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }

        res.status(500).json({ success:false,message: "Internal server errror by fetching tv trailer"});
        
    }
}


export async function getSimilarTvs(req,res) {
    const { id } = req.params;
    try {
        const data= await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.status(200).json({success:true,similar:data.results});
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }

        res.status(500).json({ success:false,message: "Internal server errror by fetching Similar tv"});
    }
}

export async function getTvByCategory(req,res) {
    const { category } = req.params;
    try {
        const data= await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        //popular,top_rated,on_the_air,airing_today
        res.status(200).json({success:true,content:data.results});
    } catch (error) {

        res.status(500).json({ success:false,message: "Internal server errror by fetching tv category"});
    }
}

export async function getTvDetails(req,res) {
    const { id } = req.params;
    try {
        const data= await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.status(200).json({success:true,content:data});
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }

        res.status(500).json({ success:false,message: "Internal server errror by fetching Tv Details"});
    }
}

export async function addTvToFavorite(req,res) {
    const{ tvId} = req.body;//for post ,pull method..it contains data that needs to proceess..this is a user input

    if (!tvId) {
        return res.status(400).json({ success: false, message: "Tv ID is required" });
    }

    try {

        const data= await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${tvId}?language=en-US`);

        const user = await User.findById(req.user._id);
        const tvExistsInFavorites = user.favorite.some(fav => fav.tvId === data.id && fav.type === "TV");

        if (tvExistsInFavorites) {
            return res.status(409).json({ success: false, message: "Tv is already in your favorites" });
        }

        // Add the movie to the user's favorites list
        const newFavoriteTv = {
            tvId: data.id,
            name: data.original_name,
            overview: data.overview,
            poster_path: data.poster_path,
            type:"TV",
        };

        const result= await User.findByIdAndUpdate(req.user._id,{
            //to delete we use pull 
            $push:{favorite:newFavoriteTv }
        });
        res.status(200).json({success: true,message: "Tv added to favorites successfully",tv: newFavoriteTv});


    } catch (error) {
        console.error("Error adding Tv to favorites:", error.message);
        res.status(500).json({success: false,message: "Internal server error while adding Tv to favorites"});
    }

    
}

export async function removeTvFromFavorite(req,res){

    //get movie from the url parms
    let { tvId } = req.params;
    //if there no movie rxisted
        if (!tvId || isNaN(tvId)) {
            return res.status(400).json({ success: false, message: "Invalid ID provided" });}
    //converting string to integer
        tvId = parseInt(tvId);
    try {
        const user = await User.findById(req.user._id);
        //this item.movieId===movieId means ..left side is the movie id of a array from database and right side is the id from url we are putting as variable
        const itemExists = user.favorite.some((item) => item.tvId === tvId && item.type==="TV");

        if (!itemExists) {
            return res.status(404).json({ success: false, message: "Item not found in Favorite List" });
        }
        const result= await User.findByIdAndUpdate(req.user._id,{
            //to delete we use pull 
            //movieId from right side is our created variable
            //movieId from left side is a object in database
            $pull:{favorite:{  tvId:tvId }}});
        if (!result) {
            return res.status(404).json({ success: false, message: "Item not found or already removed" });
        }
        res.status(200).json({ success:true ,message:"Item have been removed"});


    } catch (error) {
        console.error("Error removing movie from favorites:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
    

}