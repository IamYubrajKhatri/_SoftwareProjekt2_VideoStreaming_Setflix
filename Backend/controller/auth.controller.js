//we have defined the data structure of user model in  user.model.js ,thats why we imported this function
//await can only be used when we have async funktion
import User from "../model/user.model.js"
//to hash the password we use bycryptjs
import bcryptjs from "bcryptjs";
//to send verification code
import { SendVerificationCode} from "../config/Email.js"
import { WelcomeEmail } from "../config/Email.js";

// export const signup=(req,res)=>{} an alternative to down one
export async function signup(req,res){
    try {
        //this is a postman entry to check 
        const {username,email,password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({sucess:false,message:"All fields are required"});
        }
        //the Regex is a email validator it checks all edge case for valid email  
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if(!emailRegex.test(email)){
            return res.status(400).json({sucess:false,message:"Invalid email"});
        }
        if(password.length < 6){
            return res.status(400).json({sucess:false,message:"Password must be at least 6 characters long"});
        }

        const existingUserEmail = await User.findOne({ email: email});
        if(existingUserEmail){
            return res.status(400).json({ sucess: false, message: "Email already exist"})
        }
         
        const existingUserUsername = await User.findOne({username:username});
        if(existingUserUsername){
            return res.status(400).json({ sucess: false, message: "Username already exist"})
        }
        //hash the password here with help of bcrypt 
        const salt =await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        //lets create a otp or verification code
        //this generate a otp of 6 digit for every user
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();


        //we store a input of userdata here
        const createdNewUser = new User({
            username,
            email,
            password: hashedPassword,
            verificationCode
           
        })

        await createdNewUser.save();
        SendVerificationCode(createdNewUser.email,verificationCode);
        res.status(201).json({message:"User created successfully"})
        
    } catch (error) {

        console.log("Error: " + error.message);
        res.status(500).json({sucess:false,message: "Internal server error"})
    }
}

export const VerifyEmail=async(req,res)=>{
    try {
        //
        const { code } =req.body
        //find the user from database with the help of matching verificationCode
        const verifiedUser=await User.findOne({
            verificationCode:code
        })
        if(!verifiedUser){
            return res.status(400).json({sucess:false,message:"Invalid or expired code"})
        }

        //if the verification code matches then set the isVerified to true and the verification code to undifined and save the user
        verifiedUser.isVerified=true,
        //createdNewUser.verificationCode=undefined;
        await WelcomeEmail(verifiedUser.email,verifiedUser.username);
        await verifiedUser.save();
       
        return res.status(200).json({sucess:true,message:"Email verified successfully"})
        
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({sucess:false,message: "Internal server error"})
    }
}