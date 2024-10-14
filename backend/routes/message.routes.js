import express from "express"
import { createNewConversation, getMessage, sendMessage } from "../controllers/message.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";



const router = express.Router();

router.get("/:id", protectedRoute, getMessage);
router.post("/send/", protectedRoute, sendMessage);
router.post("/create-conversation/", protectedRoute, createNewConversation);

export default router;