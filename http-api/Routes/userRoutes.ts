import express, { Router } from "express"
import { validateSchema, validateUserToken } from "../Middleware/userMiddleware"
import { userSiginupSchema } from "../Schemas/userSchema"
import { createUser, findUserById, getAllUsers, updateUserById, patchUpdateById, deleteUser } from "../Controller/userController"
import { userLogin } from "../Controller/userController"

const router = Router()


router.post("/createuser", validateSchema(userSiginupSchema), createUser) 
router.get("/getallusers", getAllUsers)
router.get("/finduserbyid/:id", findUserById)
router.patch("/patchbyid/:id", patchUpdateById)
router.put("/updateuserbyid/:id", updateUserById)
router.delete("/deleteuser/:email", deleteUser)
router.post("/loginuser",[validateUserToken], userLogin)


export default router