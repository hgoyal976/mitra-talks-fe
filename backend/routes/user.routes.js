import express from "express"
import protectedRoute from "../middleware/protectedRoute.js";
import { getConversationsForSideBar, getUserForSideBar } from "../controllers/user.controller.js";



const router = express.Router();

router.get("/", protectedRoute, getUserForSideBar);
router.get("/conversations", protectedRoute, getConversationsForSideBar);


export default router;