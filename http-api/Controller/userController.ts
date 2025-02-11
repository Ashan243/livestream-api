import  {Request, Response} from "express"
import UserServices from "../Service/userService"
import AuthServices from "../Service/authService";
import tokenService from "../Service/tokenService";


import * as helpers from "../utils/utils"
import dotenv from "dotenv"
import { User } from "../Model/userModel";
import { QueryResult } from "pg";
import { access } from "fs";
dotenv.config()

type ResolvedQuery<T> = T extends QueryResult<any> ? Omit<User, "password"> : never
export const createUser = async(req: Request, res: Response) =>{

    try {

        const user = await UserServices.createUser(req.body)
        const userData = user.rows[0] as User
    
        

        const refreshToken = tokenService.generateToken({id: userData.id}, process.env.SECRET_KEY!, "7d")
        helpers.generateRefreshTokenCookie(res, "RefreshToken", refreshToken) //This creates a refresh token(rf) for a brand new user
        
        const accessToken = tokenService.generateToken({id: userData.id }, process.env.SECRET_KEY!, "15m") // On the creation of the rf it will also provide an access token 
        //Logic to check if the user create service was successful
        res.status(201).header("x-auth-token", accessToken).json({success: true, data: userData, token: accessToken})
        }
    
     catch (error) {
        throw new Error(error instanceof Error ? error.message : "Database Error(500)")
    }
}

export const getAllUsers = async(req: Request, res: Response) =>{

    try {
        const users = await UserServices.getAllUsers()
        res.status(200).json({success: true, data: users})

    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Database Error(500)")
    }
}

export const findUserById = async(req: Request, res: Response) =>{

   try {
     console.log(req.params.id)
     const user = await UserServices.findUserById(String(req.params.id))
     res.status(200).json({success: true, data: user})

   } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Database Error(500)")
   }
}

export const patchUpdateById = async(req: Request, res: Response) =>{

    try {
        console.log(req.params.id)
        const user = await UserServices.patchUserById(String(req.params.id), req.body)
        res.status(200).json({success: true, data: user})

    } catch ( error) {
        throw new Error(error instanceof Error ? error.message : "Database Error(500)")
    }
}

export const updateUserById = async(req: Request, res: Response) =>{

    try {
        console.log(req.params.id)
        const user = await UserServices.updateUserById(String(req.params.id), req.body)
        res.status(200).json({success: true, data: user})

    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Database Error(500)")
    }
}

export const deleteUser = async(req: Request, res: Response) =>{

    try {
        const user = await UserServices.deleteUser(req.params.email)
        res.status(200).json({success: true, data: user, message: "User successfully deleted"})

    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Database Error (500)")
    }
}


export const userLogin = async(req: Request, res: Response) => {

    try {
        const user = await AuthServices.userLogin({email: req.body.email, password: req.body.password}) //Return jwt token
        console.log(`This is to check user obj ${user}`)
        if(user){
            //Check for refresh token  T[K] = Value
   
            const refreshToken = req.cookies.refreshToken
            if(!refreshToken){
              const cookie = helpers.generateRefreshTokenCookie(res, "refreshToken", refreshToken) //Geerate Refresh Tokens and Set them in cookies
                //RBAC - Role Base Access Controlx
                console.log(cookie)
             const jwtToken = req.headers["x-auth-token"]
             if(!jwtToken){
                 const token = tokenService.generateToken({id: user.data.id}, process.env.PRIVATE_KEY!, "15m" )
                 res.status(200).header("x-auth-token", token).json({success: true, data: user.data, token: token})
             }
             
            }
            

            //Generate Access Token
            
        }
    

    } catch (error) {
        res.status(500).json({error})
    }
}