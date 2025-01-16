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

io.on("connection", (socket: Socket) => {

    //Connection event - The moment when the client side connects to the websocket serer
    socket.on("connection", (event: string) => {
        console.log("Connected")
    })
    //Subscribing to a room event 
    socket.on("subscribe", (event: string) => {
        socket.join(event)
        console.log(`Client with socket id of: ${socket.id} has subscrived to the event of: ${event} `)
    })




        socket.on("custom_disconnect", () => {
            console.log("User has disconnected" + socket.id)
            socket.disconnect()
        })
        socket.on("disconnect", (reason) => {
            //ping timeout 
            //transport close - the client closed the connection
            //transport error - Error at the TLS 
            //server namespace disconnect - Server manually discounts the client
            //client namespace disconnect - Client disconnected themselves manually
            socket.emit(`User with ${socket.id} has disconnected because of the following: ${reason}`)
        })
})
