import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMovie(req,res) {
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
        
        const randomMovie= data.results[Math.floor(Math.random() * data.results?.length)];
        //results is a name of array i ve created
        //math.random sends number between 0 and 1
        //math.floor round the decimal into integer
        res.json({success:true,content:randomMovie});

    } catch (error) {
        res.status(500).json({ success: false, message:"Internal server Error while getting trending movie"});
    }
    
}