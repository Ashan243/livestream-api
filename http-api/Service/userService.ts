import * as userModel from "../Model/userModel"
import { Request, Response, NextFunction } from "express"


/**
 * 
 * 
 */


export class UserServices{

    static async getAllUsers(){
        return await userModel.getAllUsers()

    }

    static async findUserById(id: string){
        return await userModel.getUserById(id)
    }

    static async patchUserById(userId: string, updates: Partial<userModel.User> ){
        return await userModel.patchUpdateById(userId, updates)
    }

    static async updateUserById(userId: string, updates: Partial<userModel.User>){
        return await userModel.updateUserById(userId, updates)
    }

    static async createUser(userData: userModel.User){
        return await userModel.createUser(userData) 
    }
}

export default UserServices