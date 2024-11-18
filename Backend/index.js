// const is a variable deklaration
/*const express = require('express');
const dotenv = require('dotenv');

mongo db _clustero-username yubrajkhatri
password: nR8ehGCzdCwAr3tV

mongo uri : mongodb+srv://yubrajkhatri:<db_password>@cluster0.twv65.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

*/
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const app = express();

dotenv.config();

const PORT=process.env.PORT || 4000;


//connect to mongo db
//console.log("Mongouri ", process.env.MongoDBURI); this code shows where is it connected on which uri in console
const DBURI=process.env.MongoDBURI;

try {
    mongoose.connect(DBURI)
    console.log("Connected to MongoDB");
} catch (error) {
    console.log("Error: ", error);
    
}
 








app.get('/', (req, res) => {                   // / is a home route
  res.send('Hello World! yubraj khatri')
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})