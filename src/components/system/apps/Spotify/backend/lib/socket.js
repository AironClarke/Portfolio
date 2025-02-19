import { Server } from "scoket.io"
import { Message } from "../models/message.model"

export const initalizeSocket = (server) => {
  const io = new Server(server, {
    cors:{
      origin:"http://localhost:3000",
      credentials:true
    }
  })

  const userSocket = new Map() // {userId: socketId}
  const userActivities = new Map( )// {userId: activity}

  io.on("connection", (socket) => {

    socket.on("user_connected", (userId) => {
      userSocket.set(userId, socket.id)
      userActivities.set(userId, "Idle")

      // broadcast to all connected sockets that this user just logged in
      io.emit("user_connected", userId)

      socket.emit("users_online", Array.from(userSocket.keys()))

      io.emit("activities", Array.from(userActivities.entries()))
    })

    socket.on("update_activity", ({userId, activity}) => {
      console.log("activity updated", userId, activity)
      userActivities.set(userId, activity)
      io.emit("activity_updated", {userId, activity})
    })

    socket.on("send_message", async (data) => {
      try {
        const {senderId, receiverId, content} = data

        const message = await Message.create({
          senderId,
          receiverId,
          content
        })

        //send to reciever in real time if they are online
        const receiverSocketId = userSockets.get(receiverId)
        if(receiverSocketId){
          io.to(receiverSocketId).emit("receiver_message", message)
        }

        siocket.emit("message_send",message)
      } catch (error) {

      }
    })

    socket.on("disconect", () => {
      userSocket.delete(socket.id)
    })

  })


}
