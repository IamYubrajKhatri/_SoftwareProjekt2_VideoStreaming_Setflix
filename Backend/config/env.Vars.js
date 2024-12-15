//to store the .env variable and make index.js more clean i make this file
//The value for MongodbUri is stored in .env files

import dotenv from "dotenv";

dotenv.config();

export const Env_Vars = {
    MongoDBURI: process.env.MongoDBURI,
    PORT: process.env.PORT|| 4001,

    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    ADMIN_SECRET_KEY:process.env.ADMIN_SECRET_KEY,

    AZURE_BLOB_STORAGE:process.env.AZURE_BLOB_STORAGE,


    TMDB_API_KEY: process.env.TMDB_API_KEY,
}