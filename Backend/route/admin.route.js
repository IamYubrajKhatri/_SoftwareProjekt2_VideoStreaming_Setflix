import express from "express";
import {adminLogin,adminSignup,adminLogout,createUser, deleteUser, uploadVideo,deleteVideo, toggleVideoVisibility, getAllVideos} from "../controller/admin.controller.js";
import { protectAdminRoute, protectAdminRouteCreateUser} from "../middleware/protectAdminRoute.js";
const router = express.Router();

router.post("/signup",adminSignup)
router.post("/login",adminLogin);
router.post("/logout",protectAdminRoute,adminLogout);
router.post("/create-user",protectAdminRouteCreateUser,createUser)
router.delete("/delete-user/:id",protectAdminRoute,deleteUser)
router.post("/uploadVideo",protectAdminRoute,uploadVideo)
router.delete("/deleteVideo/:videoId",protectAdminRoute,deleteVideo)
router.patch("/visibility/:videoId",protectAdminRoute,toggleVideoVisibility)
router.get("/getAllVideos",protectAdminRoute,getAllVideos)


export default router ;