import express from "express";
import {adminLogin,adminSignup,adminLogout} from "../controller/adminAuth.controller.js";
const router = express.Router();

router.post("/signup",adminSignup)
router.post("/login",adminLogin);
router.post("/logout",adminLogout);
export default router ;