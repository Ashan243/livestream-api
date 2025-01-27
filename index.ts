import express from "express"
import mongoose from "mongoose"
import * as routers from "./http-api/Routes/index"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("api/v1/users", routers.userRoutes)




const PORT = 3000

app.listen(3000, () => console.log("Listening on port: " + PORT))

