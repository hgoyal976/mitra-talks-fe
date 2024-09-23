import express from "express"
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";



const router = express.Router();

router.get("/:id", protectedRoute, getMessage);
router.post("/send/:id", protectedRoute, sendMessage);

export default router;