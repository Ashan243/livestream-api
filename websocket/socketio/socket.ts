import http from "http"
import {Server, Socket} from "socket.io"
import { ClientSignal, ClientToServerEvents, ServerToClientEvents } from "./eventtypes"
import express from "express"


const app = express()
const mainServer = http.createServer(app)

const io = new Server<ClientToServerEvents, ServerToClientEvents>(mainServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
       
    }
})

//ClientServer Interactions
//ServerClient Interactions
//Websocket configurations

//string = key
//string = values
const rooms: Record<string, string[]> = {
 
}



io.on("connection", (socket: Socket) => {
    console.log(socket.id)
    console.log("We have connected to our WebRTC service")
    
  
    //handle joining a room
    socket.on("joinRoom", (roomId: string) => {
        console.log(roomId)
        socket.join(roomId) //User joins the room
    //If there is a room by the id sent from the client then we set room
    //If not we initial a new room 
        try {
            rooms[roomId] = rooms[roomId] || [] 
            
        } catch (error) {
            console.error(error)
        }

        //Add the user to the room
        socket.to(roomId).emit("userJoined", socket.id)
        console.log("User with id of" + socket.id + "the room")
    })
    //Handle signal connection
    socket.on("sendSignal", (data: ClientSignal) => {
        socket.to(data.to).emit("receiveSignal", {
            from: socket.id,
            signal: data.signal
        })
    } )

    //Handle disconnection event
    socket.on("disconnect", (roomId: string) => {
        if(rooms[roomId])
        rooms[roomId] = rooms[roomId].filter((id) => id !== socket.id)
        //
    })
})



mainServer.listen((process.env.PORT ?? 3000), () =>{console.log(`listening on Port: ${process.env.PORT ?? 3000}`)})