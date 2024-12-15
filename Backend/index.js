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
import moviesRoute from "./route/movie1.router.js"

import adminRoute from "./route/admin.route.js"

// Import CORS middleware helps to connet twi different front and backend ports
import cors from 'cors'; 


import { Env_Vars } from "./config/env.Vars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";



import cookieParser from "cookie-parser";


const app = express();


// Enable CORS for the frontend (http://localhost:5173)
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE','Path'], // Allowed HTTP methods
  credentials: true // If you need to allow cookies or Authorization headers
}));


//connect to mongo db
//console.log("Mongouri ", process.env.MongoDBURI); this code shows where is it connected on which uri in console

const PORT=Env_Vars.PORT;
connectDB();//function called for a database connection
app.use(express.json());// will allow us to use req.body ..for eg i use postman to give the data entry in json format.
app.use(cookieParser());
//we created a variable name authRoutes for the files and imported it above so it goes to specific destination
app.use("/api/auth", authRoute);
app.use("/api/movie",protectRoute,movieRoutes);
app.use("/api/tv",protectRoute,tvRoutes);
app.use("/api/search",protectRoute,searchRoutes);
app.use("/api/movies",protectRoute,moviesRoute)
app.use("/api/admin", adminRoute);


/*
app.get('/', (req, res) => {         // / is a home route
  res.send('Hello World! yubraj khatri')
})
*/


//to show on terminal if its actually running or not
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})