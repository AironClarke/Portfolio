import express from "express"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url";
import cors from "cors"


import { clerkMiddleware } from '@clerk/express'
import { connectDB } from "./lib/db.js"
import fileUpload from "express-fileupload"
import { createServer } from "http"

import initalizeSocket from "./lib/socket.js"

import userRoutes from "./routes/user.route.js"
import adminRoutes from "./routes/admin.route.js"
import authRoutes from "./routes/auth.route.js"
import songRoutes from "./routes/song.route.js"
import albumRoutes from "./routes/album.route.js"
import statRoutes from "./routes/stat.route.js"


dotenv.config()

const app = express()
const PORT = process.env.PORT

// Fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const httpServer = createServer(app)
initalizeSocket(httpServer)

app.use(cors(
  {
    origin: "http://localhost:3000",
    credentials: true
  }
))

app.use(express.json())
app.use(clerkMiddleware()) // adds auth to req obj
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, "temp"),
  createParentPath: true,
  limits:{
    fileSize: 10 * 1024 * 1024 // 10mb max file size
  }
}))

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// error handler
app.use((error, req, res, next) => {
  res.status(500).json({ message: process.env.NODE_ENV == "production" ? "Internal server error" : error.message})
})

httpServer.listen(PORT, () => {
  console.log("Server is running on port " + PORT)
  connectDB()
})
