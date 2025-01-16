import express from "express"
import mongoose from "mongoose"


const app = express()


const PORT = 3000

app.listen(3000, () => console.log("Listening on port: " + PORT))

