import { Request, Response } from "express";
import ws from "ws"
import errorcodes from "./utils/errorcodes";
import jwt from "jsonwebtoken"
import express from "express"
import http from "http"
import dotenv from "dotenv"

dotenv.config()
//List of subscribe events
enum SubscribeEvents {
    JOIN = "join",
    LEAVE = "leave",
    CREATE_ROOM = "createRoom"
}

interface IClient {
    ws: WebSocket; // Websocket for User
    subscribedEvents: Set<SubscribeEvents> //Store Subscribed events
}
const app = express() //Express is our main listener
const mainServer = http.createServer(app) //Add express to creating the server
//Iniitial Code 
const wss = new ws.WebSocketServer({server: mainServer}) // Creates a new instance of the Websocket Server 
const clients: IClient[] = [] //Client Websocket Object Array



///The Connection event listener that listens for new client side users join the websocket server
//On connect we would write all of the code that happen to a client to prepare or server usage
wss.on("connection", (ws: WebSocket) =>{
    //Verify a user

    // if(!userKey){

    //     //Log error with winston
    //     //Connect datadog api here to pick up on error
    //     //emit data to client for the UI logic render for UX
    //     ws.send(String(errorcodes.NO_AUTH_TOKEN.code)) //Use for the client side so that we can use for troubleshooting errors
    //     ws.close(errorcodes.CONNECTION_UNSTABLE.code, errorcodes.CONNECTION_UNSTABLE.reason)
    //     return 
    // // }
    
    // try {

    //     //This is from Server to Client
    //     const payload = jwt.verify(authToken as string, process.env.SECRET_KEY!)
    //     ws.addEventListener("message", (message) => {
    //         ws.send("Message Recieved")
    //     })
    // } catch (error){
    //     ws.close(errorcodes.INVALID_AUTH_TOKEN.code, errorcodes.INVALID_AUTH_TOKEN.reason)
    // }
    
    
    ws.addEventListener("message", (message) =>{
        ws.send(`This is a message from the Server: ${JSON.stringify(message)}`)
    })
    


    //req.header["x-forward-to"] 
    console.log("Client has connected")

    const client: IClient = {ws, subscribedEvents: new Set() } //Create a new client object for each new users
    clients.push(client) //Push each new client to our clients array i.e the list of people connected to the websocket server

})

app.get("/", (req: Request, res: Response) =>{

    res.send("Server Active")
})

const PORT = process.env.PORT!|| 3000


mainServer.listen(PORT, () =>{console.log("Server Active on Port: " + PORT)})
