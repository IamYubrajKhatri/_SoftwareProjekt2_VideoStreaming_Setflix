import express from "express";
import {adminLogin,adminSignup,adminLogout,createUser, deleteUser, uploadVideo,deleteVideo, toggleVideoVisibility, getAllVideos, getAllUser} from "../controller/admin.controller.js";
import { protectAdminRoute, protectAdminRouteCreateUser} from "../middleware/protectAdminRoute.js";

import { uploadVideoToBlob } from "../middleware/azureBlobService.js";
import multer from "multer";

// Multer setup for video file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post("/signup",adminSignup)
router.post("/login",adminLogin);
router.post("/logout",protectAdminRoute,adminLogout);
router.post("/create-user",createUser)
router.delete("/delete-user/:userId",deleteUser)
router.delete("/delete-video/:videoId",deleteVideo)
router.patch("/visibility/:videoId",protectAdminRoute,toggleVideoVisibility)
router.get("/getAllVideos",protectAdminRoute,getAllVideos)


router.get("/getAllUsers",getAllUser)
router.post('/upload-video', upload.single('video'), uploadVideo);


export default router ;