import joi, { ObjectSchema } from "joi"
import { Request, Response, NextFunction }from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import axios from "axios"
dotenv.config()


export const validateUserToken = (req: Request, res: Response, next: NextFunction) => {
   
    ///Referesh
    // req.cookies = 
    try {
        //Refresh Token Check
        const userCookie = req.cookies?.refreshToken //Checking our Refresh Toekn (Generated at Signup) 
        if(!userCookie) res.status(401).json({message: "No refresh token provided"})
        
        //JWT token check
        let decodedToken = req.header("x-auth-token")
        if(!decodedToken) res.status(401).json({message: "Invalid Access Token"})

            const decoded = jwt.verify(decodedToken!, process.env.PRIVATE_KEY!);
            if((req as any).data.id == decoded ){
             next() //Access granted
            }
    } catch (error) {
       res.status(403).json({error: "Invalid Token"})
       next()
        
    }

}



export const validateSchema = (schema: ObjectSchema) =>{
    return (req: Request, res: Response, next: NextFunction) =>{
        const {error} = schema.validate(req.body, {abortEarly: false})
        if(error){
            res.status(400).json({errors: error.details.map((details) => ({
                message: details.message,
                field: details.path.join(".")
            })
        )})
        return
        }
       
        next()
    }
}