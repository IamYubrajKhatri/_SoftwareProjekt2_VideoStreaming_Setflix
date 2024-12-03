import bcryptjs from "bcryptjs";
import User from "../model/user.model.js"
import { generateTokenAndSetCookieAdmin } from "../utils/generateToken.js";
import { SendVerificationCode} from "../middleware/Email.js"
import { Env_Vars } from "../config/env.Vars.js";
//admin signup
export async function adminSignup(req,res){
    const { username,email, password, secretKey } = req.body;

    if(!username || !email || !password|| !secretKey){
        return res.status(400).json({sucess:false,message:"All fields are required"});}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
    if(!emailRegex.test(email)){
        return res.status(400).json({sucess:false,message:"Invalid email"});}

    if(password.length < 6){
        return res.status(400).json({sucess:false,message:"Password must be at least 6 characters long"});}

    try {
        if(secretKey!==Env_Vars.ADMIN_SECRET_KEY){
            return res.status(403).json({ success: false, message: 'Invalid secret key for admin signup' });}

        //checks if user already exist
        const user =await User.findOne({email});
        if(user){
             return res.status(400).json({ success: false, message: 'Normal user already exists so admin cannot be created' });}

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email, isAdmin: true });
        if (existingAdmin) {
             return res.status(400).json({ success: false, message: 'Admin already exists' });}

        const salt =await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        const createdNewUser = new User({
        username,
        email,
        password: hashedPassword,
        verificationCode,
        isAdmin:true
        })

        //the down code saves the data in database
        await createdNewUser.save();
        SendVerificationCode(createdNewUser.email,verificationCode);
        res.status(201).json({message:"Admin created successfully"})

    } catch (error) {
        console.error('Error during admin signup:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error while creating admin' });
    }
}
//admin login
export async function adminLogin(req,res){
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({success: false, message: "All fields are required"});
    }
    try {
        const user =await User.findOne({ email, isAdmin:false})
        if(user){
             return res.status(400).json({ success: false, message: 'You are not admin ..Access denied' });
        }
        // Find the admin user by email
        const admin = await User.findOne({ email, isAdmin: true });
        if (!admin) {
             return res.status(404).json({ success: false, message: 'Admin not found' });
        }
        if (!admin.isVerified) {
            return res.status(401).json({ success: false, message: "Please verify your email to login" });
        }

        // Verify password
        const isPasswordValid = await bcryptjs.compare(password, admin.password);
        if (!isPasswordValid) {
             return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
        //_id is a user unique number stored in mongodb first line
        generateTokenAndSetCookieAdmin(admin._id,res);
             res.status(200).json({success:true, message: "Login as admin successfull"})
    
    }catch(error){
         console.error('Error during admin login:', error.message);
             res.status(500).json({ success: false, message: 'Internal server error admin login' });
}
}
//adminlogout
export async function adminLogout(req,res) {
    try {
        res.clearCookie("jwt-setflix-Admin");
        res.status(200).json({sucess:true, message: "Logged out successfully as admin"});
        
    } catch (error) {
        console.log("Error in logout controller",error.message);
        res.status(500).json({sucess: false, message: "Internal server error-Logout-admin"});
    }
    
}
