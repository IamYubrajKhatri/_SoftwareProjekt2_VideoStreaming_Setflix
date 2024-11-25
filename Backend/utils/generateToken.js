import jwt from "jsonwebtoken"
import { Env_Vars } from "../config/env.Vars.js"

export const generateTokenAndSetCookie = (userId,res) =>{
  const token = jwt.sign({userId}, Env_Vars.JWT_SECRET, {expiresIn:"15d"}) ; 

  res.cookie("jwt-setflix",token,{
    maxAge: 15*24*60*60*1000, // 15 days in ms
    httpOnly:true,
    sameSite: "strict",
    secure: Env_Vars.NODE_ENV !== "development",

})

return token;
}

//tokens ,such as Jwts are typically not stored in the database along wirh other user details.Instead they are issued by server during the authentication process and then stored on client side(eg cookie or local storage ) for later use