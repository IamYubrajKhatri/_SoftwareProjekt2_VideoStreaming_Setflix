import jwt from "jsonwebtoken"
import User from "../model/user.model.js"
import { Env_Vars } from "../config/env.Vars.js"

//It's asynchronous because it performs database operations (e.g., User.findById()).
export const protectAdminRoute=async(req,res,next)=>{
    try {
        const token = req.cookies["jwt-setflix-Admin"]
        if(!token){
            return res.status(401).json({success: false,message:"unauthorized-No Token Provided-Admin"})
        }
//Decodes the token using the ADMIN_SECRET_KEY from Env_Vars.
//Returns the payload (e.g., userId) if the token is valid.
        const verifyToken = jwt.verify(token,Env_Vars.ADMIN_SECRET_KEY);
        if(!verifyToken){
            return res.status(401).json({success: false,message:"unauthorized-Invalid Token-Admin"})
        }
//Looks up the user in the database by the userId extracted from the token.
        const user = await User.findById(verifyToken.userId).select("-password");
        if(!user){
            return res.status(404).json({success: false,message:"User not found-Admin"})
         }
//req.user is a property(req is http request and user is our variable newly created)
//the above user details is stored in req.user
         req.user = user;
         next();
        
    } catch (error) {
        console.log("Error in protectAdminRoute middelware",error.message);
        res.status(500).json({success: false,message:"Internal server eror during protecting routes-Admin"})
    }
}

//It's asynchronous because it performs database operations (e.g., User.findById()).
export const protectAdminRouteCreateUser=async(req,res,next)=>{
    try {
        const token = req.cookies["jwt-setflix-Admin"]
        if(!token){
            return res.status(401).json({success: false,message:"unauthorized-No Token Provided-Admin"})
        }
//Decodes the token using the ADMIN_SECRET_KEY from Env_Vars.
//Returns the payload (e.g., userId) if the token is valid.
        const verifyToken = jwt.verify(token,Env_Vars.ADMIN_SECRET_KEY);
        if(!verifyToken){
            return res.status(401).json({success: false,message:"unauthorized-Invalid Token-Admin"})
        }

         next();
        
    } catch (error) {
        console.log("Error in protectAdminRoute middelware",error.message);
        res.status(500).json({success: false,message:"Internal server eror during protecting routes-Admin"})
    }
}