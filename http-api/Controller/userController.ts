import UserServices from "../Service/userService";
import { Request, Response, NextFunction } from "express";
import express from "express"



// const app = express()

// app.post("/", handleUser, async(req: Request, res: Response) => {
//     ///Body = services
// })




export const createUser = async(req: Request, res: Response) =>{

    try {
        const user = await UserServices.createUser(req.body)
        res.status(200).json({success: true, data: user})
        
    } catch (error) {
        res.status(500).json({message: "Error on the server side"})
    }

}


