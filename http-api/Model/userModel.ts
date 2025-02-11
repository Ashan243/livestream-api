import { QueryResult } from "pg"
import { connectionPool, queryHandler } from "../Database/db"
import bcrypt from "bcrypt"
import cuid from "cuid"
import axios from "axios"
export interface User{

    id: string
    email: string
    username: string
    password: string
    mobile: string
}



//Get all users
 //Define curd operations

 const getAllUsers = async (): Promise<User[]> => {
    const users = await connectionPool.query("SELECT * FROM users");
    return users.rows; //Return the rows of the data for the user 
}

const getUserById = async(id: string): Promise<QueryResult<User>> => {
    const user = await queryHandler("SELECT FROM users WHERE id = $1", [id])
    return user.rows[0]
}

//Create
const createUser = async(userData: User): Promise<QueryResult<User>> => {
    
        const { username, email, password, mobile} = userData
        const id = cuid()
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await queryHandler('INSERT INTO users (id, username, email, password, mobile) VALUES ($1, $2, $3, $4, $5) RETURNING *', [id, username, email, hashedPassword, mobile])
        console.log(user.rows[0])

        //Generate Refresh Token


        //Generate Acess
        return user 
    
    }

//Retriee/Get
const findUserById = async(id: string): Promise<QueryResult<any>> =>{

 
    const user = await queryHandler("SELECT * FROM users WHERE id = $1", [id])
    console.log(user.rows[0])
    console.log(user.rowCount)
    return user.rows[0]
}

//Put/Patch

//Stack - Data stored is of fixed size known before runtime
//Heap - Data that stored has varying size

const patchUpdateById = async(userId: string, updates: Partial<User>): Promise<void | QueryResult<any>> => {

    const dbFields = Object.keys(updates)
    //{id: 10, name: Michael}.keys()  =[id, name]
    console.log("User DB Fields", dbFields)

    if(dbFields.length === 0){
        throw new Error("No new data given") //this is th handle the case of no data received
    }
    //grab the values
    
        const userValues = Object.values(updates)
        //{id: 10, name: Michael} = [10, Michael]
        console.log("User Values using Object", userValues)
        console.log(userValues[0] + " at index 0 test")
        console.log(userValues + " full value test")
        console.log(dbFields[0])
        console.log(userValues)
        console.log(userId)

        console.log([...userValues])

    //        const updateQuery = format(
    //     'UPDATE users SET %L = $1 WHERE id = $2',
    //     ...dbFields.map(field => `${field} = ${updates[field]}`)
    // );

       console.log(`UPDATE users SET ${dbFields[0]} = ${userValues[0]} WHERE id = $2`)
        const user = await queryHandler(`UPDATE users SET ${dbFields[0]} = $1 WHERE id = $2`, [userValues[0], userId])
        return user.rows[0]

}
const updateUserById = async(userId: string, updates: Partial<User>): Promise<void |QueryResult<any>> =>{
    


    //fields 
    //grab the keys
    const dbFields = Object.keys(updates)
    console.log("User DB Fields", dbFields)

    if(dbFields.length === 0){
        throw new Error("No new data given") //this is th handle the case of no data received
    }
    //grab the values


    
        const userValues = Object.values(updates)
        console.log("User Values using Object", userValues)
        //SQL - SET 
        //1values - in an Array
        //Output is string (SQL Statment)
        //SET field = value, field2 = values2, 
        const setClause = dbFields.map((field, index) => `${field} = $${index + 1}`).join(", ") //e.g user updates 3 fields = $1, $2, $3
        console.log(setClause)
        console.log(`UPDATE users SET ${setClause} WHERE id = $${dbFields.length + 1 } RETURNING *`)
        //3 ITMES TO BE UPDATED = $1
        //$ to show that we want place dynamic in the statement
        //$ for the template
        //$${}
        //..userValue -> ... Symbol.iterator()
        const user = await queryHandler(`UPDATE users SET ${setClause} WHERE id = $${dbFields.length + 1 } RETURNING *`, [...userValues, userId])
        return user.rows[0]


}



//Delete
const deleteUser = async(email: string): Promise<void>  =>{
    console.log(email)
    if(email.includes("@")){    
    await queryHandler(`DELETE FROM users WHERE email = $1 RETURNING *`, [email])
}
 console.log("Email must contain an @")
}






export {
    getAllUsers,
    updateUserById,
    patchUpdateById,
    deleteUser,
    createUser,
    findUserById,
    
    
}
