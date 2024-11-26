import { fetchFromTMDB } from "../services/tmdb.service.js";

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