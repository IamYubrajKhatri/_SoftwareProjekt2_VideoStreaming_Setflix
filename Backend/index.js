// const is a variable deklaration
//setflix_db the name of my database :i gave it to my mongodburi before the?
/*const express = require('express');
const dotenv = require('dotenv');
*/

import express from "express";
import authRoute from "./route/auth.route.js";
import { Env_Vars } from "./config/env.Vars.js";
import { connectDB } from "./config/db.js";

const app = express();



//connect to mongo db
//console.log("Mongouri ", process.env.MongoDBURI); this code shows where is it connected on which uri in console

const PORT=Env_Vars.PORT;
connectDB();//function called for a database connection
app.use(express.json());// will allow us to use req.body ..for eg i use postman to give the data entry in json format.
app.use("/auth", authRoute);//we created a variable name authRoutes for the files and imported it

/*
app.get('/', (req, res) => {         // / is a home route
  res.send('Hello World! yubraj khatri')
})
*/


//to show on terminal if its actually running or not
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})