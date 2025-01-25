import {Pool} from "pg"
import dotenv from "dotenv"
import { query } from "express"


const altPath =  process.env.NODE_ENV === "development" ? "../.env.local" : "../.env.production"

dotenv.config()


export const connectionPool = new Pool({
    host: process.env.HOST,
    port: parseInt(process.env.PG_POST! || '5432', 10),
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
})

connectionPool.on("connect", () => {
    console.log("Connected to PostgreSQL")
})
connectionPool.on("error", (error) => {
    console.error("Error connecting to the database", error)
})
//ACID 
//Relational Databases for data has relationships 
//One User -> One Address 

export const queryHandler = (query: string, params?: any[]) => connectionPool.query(query, params)