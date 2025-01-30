import express from "express"
import mongoose from "mongoose"
import * as routers from "./http-api/Routes/index"
import http from "http"
import { Server } from "socket.io"
import { ClientSignal, ClientToServerEvents, ServerToClientEvents } from "./websocket/socketio/eventtypes"
const app = express()
import dotenv from "dotenv"
import { connectionPool } from "./http-api/Database/db"

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/v1/users", routers.userRoutes)

const mainServer = http.createServer(app)

export const io = new Server<ClientToServerEvents, ServerToClientEvents>(mainServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
       
    }
})




const PORT = process.env.PORT || 3000

app.listen(3000, () => {
    console.log("Listening on port: " + PORT)
    connectionPool.connect()
})

