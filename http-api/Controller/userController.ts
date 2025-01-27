import express, {Request, Response, NextFunction} from "express"
import UserServices from "../Service/userService"


export const createUser = async(req: Request, res: Response) =>{

    try {
        const user = await UserServices.createUser(req.body)
        res.status(200).json({success: true, data: user})
    
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Database Error(500)")
    }
}

export const getAllUsers = async(req: Request, res: Response) =>{

    try {
        const user = await UserServices.getAllUsers()
        res.status(200).json({success: true, data: user})

    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Database Error(500)")
    }
}

export const findUserById = async(req: Request, res: Response) =>{

   try {
     const user = await UserServices.findUserById(req.body)
     res.status(200).json({success: true, data: user})

   } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Database Error(500)")
   }
}

export const patchUpdateById = async(req: Request, res: Response) =>{

    try {
        const user = await UserServices.patchUserById(req.params.id, req.body)
        res.status(200).json({success: true, data: user})

    } catch ( error) {
        throw new Error(error instanceof Error ? error.message : "Database Error(500)")
    }
}

export const updateUserById = async(req: Request, res: Response) =>{

    try {
        const user = await UserServices.updateUserById(req.params.id, req.body)
        res.status(200).json({success: true, data: user})

    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Database Error(500)")
    }
}