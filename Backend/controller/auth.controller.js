//we have defined the data structure of user model in  user.model.js ,thats why we imported this function
//await can only be used when we have async funktion
import User from "../model/user.model.js"
//to hash the password we use bycryptjs
import bcryptjs from "bcryptjs";

// export const signup=(req,res)=>{} an alternative to down one
export async function signup(req,res){
    try {
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
//has the password here
        const salt =await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        //we store a input of userdata here
        const createdNewUser = new User({
            username,
            email,
            password: hashedPassword,
           
        })

        await createdNewUser.save();
        res.status(201).json({message:"User created successfully"})
        
    } catch (error) {

        console.log("Error: " + error.message);
        res.status(500).json({sucess:false,message: "Internal server error"})
    }
}