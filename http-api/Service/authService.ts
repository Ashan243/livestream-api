

import jwt from "jsonwebtoken"
import { User } from "../Model/userModel"
import bcrypt from "bcrypt"
import { queryHandler } from "../Database/db"
import express, { Request, Response } from "express"

const app = express()

app.post("/", async(req: Request, res: Response) => {

    ////Controller

    //Service - if the controller is happy to proceed
})


class AuthServices{

    //Method handles User Logging in
    static async userLogin(userData: {email: string, password: string}){
        
        try {
            //WQuery the database based on the data we reeceive from our controller
            const user = await queryHandler(`SELECT * FROM users WHERE email = $1`, [userData.email])
            if(user.rowCount === 0){
                throw new Error(`Username or Password is incorrect`)
            }
            
             let userObject: User = user.rows[0]
             const validatePassword = await bcrypt.compare(userData.password, userObject.password)

            if(!validatePassword){
                throw new Error(`Username or Password is incorrect`)
            }
            //We can confirm that we have a valid user

             
             
             return {data: userObject }
        
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Database Error(500)")
        }


       
    }
}

export default AuthServices
