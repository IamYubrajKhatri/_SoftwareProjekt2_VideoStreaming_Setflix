import { fetchFromTMDB } from "../services/tmdb.service.js";

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