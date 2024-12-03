import express from "express";
import {adminLogin,adminSignup,adminLogout,createUser, deleteUser} from "../controller/admin.controller.js";
import { protectAdminRoute, protectAdminRouteCreateUser} from "../middleware/protectAdminRoute.js";
const router = express.Router();

router.post("/signup",adminSignup)
router.post("/login",adminLogin);
router.post("/logout",protectAdminRoute,adminLogout);
router.post("/create-user",protectAdminRouteCreateUser,createUser)
router.delete("/delete-user/:id",protectAdminRoute,deleteUser)

export default router ;