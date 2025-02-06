import { Router } from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { getAllUsers } from "../controller/user.controller.js";

const router = Router();

router.get("/like", protectRoute, (req,res) => {
  req.auth.userId
  res.send("User route with GET method")
})

router.get("/", protectRoute, getAllUsers)

export default router
