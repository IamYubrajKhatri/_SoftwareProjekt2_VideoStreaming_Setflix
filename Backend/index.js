// const is a variable deklaration
//setflix_db the name of my database :i gave it to my mongodburi before the?
/*const express = require('express');
const dotenv = require('dotenv');
*/

import express from "express";

import authRoute from "./route/auth.route.js";
import movieRoutes from "./route/movie.route.js"
import tvRoutes from "./route/tv.route.js"
import searchRoutes from "./route/search.route.js"



import { Env_Vars } from "./config/env.Vars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

import cookieParser from "cookie-parser";

const app = express();



//connect to mongo db
//console.log("Mongouri ", process.env.MongoDBURI); this code shows where is it connected on which uri in console

const PORT=Env_Vars.PORT;
connectDB();//function called for a database connection
app.use(express.json());// will allow us to use req.body ..for eg i use postman to give the data entry in json format.
app.use(cookieParser());
app.use("/auth", authRoute);//we created a variable name authRoutes for the files and imported it above so it goes to specific destination
app.use("/movie",protectRoute,movieRoutes);
app.use("/tv",protectRoute,tvRoutes);
app.use("/search",protectRoute,searchRoutes);


/*
app.get('/', (req, res) => {         // / is a home route
  res.send('Hello World! yubraj khatri')
})
*/


//to show on terminal if its actually running or not
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})