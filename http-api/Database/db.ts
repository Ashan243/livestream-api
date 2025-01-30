import {Pool} from "pg"
import dotenv from "dotenv"
import path from "path"
import fs from "fs"
import { exec } from "child_process"
import { connect } from "http2"

dotenv.config()


export const connectionPool = new Pool({
    host:"localhost",
    port: 5432,
    user: "postgres",
    password: "Gu1tarman",
    database: "Websocket-Project"
})


const executeSetup = async () => {
    let fileData: string
    try {
        const setupFilePath = path.join(__dirname, 'setup.sql')//Find the SQL setup file
        
         fs.readFile(setupFilePath, (err, data) => {
            if(err){
                throw new Error(err.message)
            }
            fileData = data.toString()
            connectionPool.query(fileData)
        });

        //Use query pool func
      
    } catch (error) {
        console.log("Error executing SQL Setup")
    } 
    // finally {
    //     await connectionPool.end()
    // }
}

connectionPool.on("connect", async () => {
    console.log("Connected to PostgreSQL")
    const checkUserTableQuery = "SELECT * FROM users"
    const query = await queryHandler(checkUserTableQuery)
    console.log(query.rowCount)
    if(query.rowCount === 0){
         await executeSetup()
    }


})
connectionPool.on("error", (error) => {
    console.error("Error connecting to the database", error)
})

//ACID 
//Relational Databases for data has relationships 
//One User -> One Address 

export const queryHandler = (query: string, params?: any[]) => connectionPool.query(query, params)