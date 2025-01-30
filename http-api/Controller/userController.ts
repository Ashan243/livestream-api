import express, {Request, Response, NextFunction} from "express"
import UserServices from "../Service/userService"


export const createUser = async(req: Request, res: Response) =>{

    try {
        const user = await UserServices.createUser(req.body)
        res.status(201).json({success: true, data: user})
    
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
        const user = await UserServices.deleteUser(req.body.email)
        res.status(200).json({success: true, data: user, message: "User successfully deleted"})

    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Database Error (500)")
    }
}