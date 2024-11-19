import express from "express";
//we import signup function from controller.js
import { signup } from "../controller/auth.controller.js";

const router = express.Router();
//the Router acts as a mini app that you can attach middelware and route handler to.

router.post("/signup",signup);//post method beacuse user send the data to us to be controlled and saved by us


export default router ;
//with this export keyword we can use the function router on other files