//to store the .env variable and make index.js more clean i make this file

import dotenv from "dotenv";

dotenv.config();

export const Env_Vars = {
    MongoDBURI: process.env.MongoDBURI,
    PORT: process.env.PORT|| 4001,
}