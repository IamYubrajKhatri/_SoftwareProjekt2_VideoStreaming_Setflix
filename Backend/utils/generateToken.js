import jwt from "jsonwebtoken"
import { Env_Vars } from "../config/env.Vars.js"

export const generateTokenAndSetCookie = (userId,res) =>{
  //rhis line create  jws web token with three things payload(userId),secret(my secret to sign the token)and expiration
  const token = jwt.sign({userId}, Env_Vars.JWT_SECRET, {expiresIn:"15d"}) ; 



  //this function stores the jwt token in a cookie called jwt-setflix
  res.cookie("jwt-setflix",token,{
    maxAge: 15*24*60*60*1000, // 15 days in ms
    httpOnly:true,//cannot be accessed by javascript
    sameSite: "strict",//only in same origin
    secure: Env_Vars.NODE_ENV !== "development",//only be sent over https during produvtion so token will not be exposed

})

return token;//its optional ,it sends the token back to calling function in my case to login route
}

//tokens ,such as Jwts are typically not stored in the database along wirh other user details.Instead they are issued by server during the authentication process and then stored on client side(eg cookie or local storage ) for later use