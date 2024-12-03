import express from "express";
import { adminDashboard } from "../controller/adminDashboard.controller.js";
const router = express.Router();
router.get("/userEdit",adminDashboard)
export default router ;