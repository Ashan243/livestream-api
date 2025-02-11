

import axios from "axios"
import { exec } from "child_process"
import cuid from "cuid"


const BACKEND_URL = "http://localhost:3000/api/v1"


//Test signing up with wrong details that do not fit the Joi Schema
//Test signing in (POST) with corrext detials
//Testing signing with wrong detaisl

describe("Authentication", () => {
    test("User is able to sign up with correct credentials", async() => {
        const random = cuid()
        const user_email = "testuser5@gmail.com"
        const username = "testuser"
        const password = "password"
        const mobile = "07384923482"
        const response = await axios.post(`${BACKEND_URL}/users/createuser`, {
        
            email: user_email,
            username,
            password,
            mobile,
        })

        //Expect for request codes
        expect(response.status).toBe(201)

        ///extract the id of the user
        //Clean up the data entry
        const deleteResponse = await axios.delete(`${BACKEND_URL}/users/deleteuser/${user_email}`)
        expect(deleteResponse.status).toBe(200)
    })

    test("User siging up with wrong details", async() =>{
        try {
        const email = "tes96gmail.com"
        const username = "testman44"
        const password = "pass"
        const mobile = "0738497890"
        const response = await axios.post(`${BACKEND_URL}/users/createuser`, {
        
            email,
            username,
            password,
            mobile,
        })

        expect(response.status).toBe(400)
    } catch (error) {
        console.log(error)
    }



})
})


// describe("Updating userdata", () =>{
//     let test_id: string
//     let test_email: string
//     let test_username: string
//     let test_password: string
//     let test_mobile: string
//     let test_jwt_token: string
//     let test_cookie: string
//     beforeAll(async() => {
//         const username = "updatedusername"
//         const email = "update@gmail.com"
//         const password = "Ashan-Math"
//         const mobile = "07534827447"

//         //Create a new user first
//         const signUpResponse = await axios.post(`${BACKEND_URL}/users/createuser`, {username, email, password, mobile})
//         test_cookie = signUpResponse.data.cookie
//        //Sign in a user
       
//        const signInResponse = await axios.post(`${BACKEND_URL}/users/loginuser`, {email, password}) 
//        test_jwt_token = signInResponse.data.token
//        test_id = signInResponse.data.data.id

       
      
        
//         test_email = email
//         test_password = password
//         test_username = username
//         test_mobile = mobile
//     }, 300000)

    //In the context any user actions 
    //where we assume that user already exists we need to use before to sign the up person first


//     test("Update user", async() =>{

//         const response = await axios.put(`${BACKEND_URL}/users/updateuserbyid/${test_id}`, {
 
//             email: test_email,
//             username: test_username
//         }, {headers: {"x-auth-token": test_jwt_token}, xsrfCookieName: test_cookie})

//         expect(response.status).toBe(200)
    


describe("Getting all user data", () =>{

    test("get all users", async() =>{

        const response = await axios.get(`${BACKEND_URL}/users/getallusers`)

        expect(response.data.data.length).toBeGreaterThan(0)

    })
})