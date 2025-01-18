import http from "http"
import {Server, Socket} from "socket.io"
import { ClientToServerEvents, ServerToClientEvents } from "./eventtypes"



const server = http.createServer({})


const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
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
    console.log("We have connected to our WebRTC service")
    
  
    //handle joining a room
    socket.on("joinRoom", (roomId: string) => {
        socket.join(roomId) //User joins the room
        rooms[roomId] = rooms[roomId] || []
        //Add the user to the room
        rooms[roomId].push(socket.id)
        socket.to(roomId).emit("userJoined", socket.id)
        console.log("User with id of" + socket.id + "the room")
    })
})
