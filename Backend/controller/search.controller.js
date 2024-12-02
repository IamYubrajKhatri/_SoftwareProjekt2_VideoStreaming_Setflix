import { fetchFromTMDB } from "../services/tmdb.service.js";

import User from "../model/user.model.js"

export async function searchPerson(req,res) {
    //this is the query that user passsed and we have it on search routes defined
    //req.parm is a object that contains  route paramater,which are a part of route path.it is defined in (:) and they are dynamic.in this case we have a query in url.
    const { query } = req.params;

    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        //to search as user input ${query} ,dynamic input .

        if(response.results.length == 0){
            return res.status(404).send(null);
        }

        //to store the search results for a specefic logged in user
        //this req.user is defined in protectRoute.js 
        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    //syntax for updating : left our own created vairable and right is the variable from tmbd
                    id:response.results[0].id,
                    image:response.results[0].profile_path,
                    title:response.results[0].name,
                    searchType:"person",
                    createdAt: new Date(),
                }

            }
        })


        //response.results...results is the response that we get from Tmdb webseite after calling it
        res.status(200).json({ success:true ,content: response.results});

    } catch (error) {
        console.log("Error in searchPerson controller: ",error.message);
        
        res.status(500).json({ success:false,message: "Internal server errror by searching person"});
    }
    
}

export async function searchMovie(req,res) {

    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);

        if(response.results.length == 0){
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].title,
                    searchType:"movie",
                    createdAt: new Date(),
                }

            }
        })
        res.status(200).json({ success:true ,content: response.results});

    } catch (error) {

        console.log("Error in searchPerson controller: ",error.message);
        
        res.status(500).json({ success:false,message: "Internal server errror by searching movie"});
       
    }
    
}

export async function searchTv(req,res) {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);

        if(response.results.length == 0){
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].name,
                    searchType:"TV",
                    createdAt: new Date(),
                }

            }
        })
        res.status(200).json({ success:true ,content: response.results});

    } catch (error) {

        console.log("Error in searchPerson controller: ",error.message);
        
        res.status(500).json({ success:false,message: "Internal server errror by searching Tv"});
       
    }
    
}

export async function getSearchHistory(req,res) {
    try {
        //this searchHistory is a variable we created above in searchTv,Movies,person function 
        res.status(200).json({ success:true, content: req.user.searchHistory});
    } catch (error) {
        es.status(500).json({success: false,message:"Internal server eror during getting search history"})
    }
}

export async function removeItemFromSearchHistory(req,res) {
//we are updating varible so let keyword
    let { id } = req.params;
//if there no user rxisted
    if (!id || isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid ID provided" });}
//converting string to integer
    id = parseInt(id);
    try {
         const user = await User.findById(req.user._id);
         // Check if the item exists in the search history
         //some is a method in js functions for array used to test  whether at least one element in the array satisfies the provided condition 
         //user search history [{id,image,title,..},{id,image,title,..},{id,image,title,..}...]
         //item is a variable name i set...some() checks the item id  if it matches 
         const itemExists = user.searchHistory.some((item) => item.id === id);
         if (!itemExists) {
             return res.status(404).json({ success: false, message: "Item not found in search history" });
         }
      // Update the user's search history
       const result= await User.findByIdAndUpdate(req.user._id,{
            //to delete we use pull 
            $pull:{searchHistory:{  id:id }}});
        if (!result) {
            return res.status(404).json({ success: false, message: "Item not found or already removed" });
        }
        res.status(200).json({ success:true ,message:"Item have been removed"});

    } catch (error) {
        console.log("Error in removeItemFromSearchHistory Controller",error.message);
        res.status(500).json({success: false,message:"Internal server eror during removing items"})
    }
    
    
}

