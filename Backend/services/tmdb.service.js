import axios from "axios";
import { Env_Vars } from "../config/env.Vars.js";
//axios is a java script library used to make http request
//used to fetch data
//eg used in front oder backend to interreact with api like tmdb

//we create a function name fetchFromTMDB to connect to tmbd api with the help of api key
//this is a arrow function 
export const fetchFromTMDB = async (url) => {
    const options = {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + Env_Vars.TMDB_API_KEY,
                }
                     };

    //this below syntax means get the url of videos and with the option defined as avove
 const response = await axios.get(url,options);


    //200 is a success message
  if(response.status !== 200){
  throw new Error('Failed to fetch data from TMDB'+ response.statusText);}

 return response.data;
 //it can return data(eg actual data),status(eg status code),headers,config.

}