import { Router } from "express"
import { createSong, deleteSong, checkAdmin } from "../controller/admin.controller.js"
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute, checkAdmin) // applies this to all routes

router.get("/check", checkAdmin)

router.post("/songs", createSong)
router.delete("/songs/:id", deleteSong)

router.post("/albums", createSong)
router.delete("/albums/:id", deleteSong)

export default router
