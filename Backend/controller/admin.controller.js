import bcryptjs from "bcryptjs";
import User from "../model/user.model.js"
import Video from "../model/video.model.js";
import { generateTokenAndSetCookieAdmin } from "../utils/generateToken.js";
import { SendVerificationCode} from "../middleware/Email.js"
import { Env_Vars } from "../config/env.Vars.js";
import mongoose from "mongoose";
import Movie from "../model/movie.model.js";

import { uploadVideoToBlob } from "../middleware/azureBlobService.js";


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
             return res.status(400).json({ success: false, message: 'User already exists so admin cannot be created' });}

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
    const { email, password,secretKey } = req.body;
    if(!email || !password|| !secretKey){
        return res.status(400).json({success: false, message: "All fields are required"});
    }
    try {

        if(secretKey!==Env_Vars.ADMIN_SECRET_KEY){
            return res.status(403).json({ success: false, message: 'Invalid secret key for Login as admin' });}


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

    admin.isLoggedin = true;
        await admin.save();

    
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
        const userId = req.user?._id; // user info is in req.user from middleware
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized/No token available" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.isLoggedin = false;
        await user.save();

        res.clearCookie("jwt-setflix-Admin");
        res.status(200).json({sucess:true, message: "Logged out successfully as admin"});
        
    } catch (error) {
        console.log("Error in logout controller",error.message);
        res.status(500).json({sucess: false, message: "Internal server error-Logout-admin"});
    }
    
}

export async function createUser(req,res){

    try {
        const { username, email, password,} = req.body;

        // Check if all fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
    if(!emailRegex.test(email)){
        return res.status(400).json({sucess:false,message:"Invalid email"});}

    if(password.length < 6){
        return res.status(400).json({sucess:false,message:"Password must be at least 6 characters long"});}

        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            isVerified:true,
            isAdmin:false,
        });

        await newUser.save();

        res.status(201).json({ success: true, message: "User created successfully by Admin", user: newUser });
    } catch (error) {
        console.error("Error in createUser:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export async function deleteUser(req, res) {
    try {
        const { userId } = req.params;

        // Ensure that the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID format" });
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found in database" });
        }

        if (user.isAdmin === true) {
            return res.status(404).json({ success: false, message: "Admin User cannot be deleted" });
        }

        // Delete the user
        await user.deleteOne();
        res.status(200).json({ success: true, message: "User deleted successfully by admin" });
    } catch (error) {
        console.error("Error in deleteUser:", error.message);
        res.status(500).json({ success: false, message: "Internal server error while deleting user" });
    }
}

export async function uploadVideo(req,res){
    const { title, description } = req.body;
    const videoFile = req.file;

    //const adminId = req.user._id;
    if (!title || !description || !videoFile) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Generate a unique video name
    const videoName = title || `${Date.now()}_${videoFile.originalname}`;

    // Upload the video to Azure Blob Storage and get the video URL
    const videoUrl = await uploadVideoToBlob(videoFile.buffer, videoName);

    try {
        const newVideo = new Movie({
            name:videoName,
            description:description,
            videoUrl:videoUrl,
           // uploadedBy: adminId,
        });
        await newVideo.save();
        res.status(201).json({ success: true, message: "Video uploaded successfully", video: newVideo });
    } catch (error) {
        console.error("Error uploading video:", error.message);
        res.status(500).json({ success: false, message: "Internal server error during video upload" });
    }
}
export async function deleteVideo(req, res) {
    const { videoId } = req.params;

    try {
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ success: false, message: "Video not found" });
        }

        await video.deleteOne();
        res.status(200).json({ success: true, message: "Video deleted successfully" });
    } catch (error) {
        console.error("Error deleting video:", error.message);
        res.status(500).json({ success: false, message: "Internal server error during video deletion" });
    }
};
export async function toggleVideoVisibility(req,res) {
    const { videoId } = req.params;
    try {
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ success: false, message: "Video not found" });
        }

        //it will flip the value
        video.isHidden = !video.isHidden;
        await video.save();

        res.status(200).json({
            success: true,
            message: `Video is now ${video.isHidden ? "hidden" : "visible"}`,
            video,
        });
    } catch (error) {
        console.error("Error toggling video visibility:", error.message);
        res.status(500).json({ success: false, message: "Internal server error during visibility toggle" });
    }
}
export const getAllVideos = async (req, res) => {
    try {
        // Fetch all videos regardless of their visibility
        const videos = await Video.find();
        res.status(200).json({ success: true, videos });
    } catch (error) {
        console.error("Error fetching all videos:", error.message);
        res.status(500).json({ success: false, message: "Internal server error during fetching videos" });
    }
};

export async function getAllUser(req,res) {
    try {
        const users = await User.find();
        res.status(200).json({success:true,users});
        
    } catch (error) {
        console.error("Error fetching all users:", error.message);
        res.status(500).json({ success: false, message: "Internal server error during fetching user" });
    
    }
    
}