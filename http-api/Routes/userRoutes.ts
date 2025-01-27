import express, { Router } from "express"
import { validateSchema } from "../Middleware/userMiddleware"
import { userSiginupSchema } from "../Schemas/userSchema"
import { createUser, findUserById, getAllUsers, updateUserById, patchUpdateById } from "../Controller/userController"

const router = Router()


router.post("/createuser", validateSchema(userSiginupSchema), createUser) 
router.get("/getallusers", getAllUsers)
router.get("/findbyid:id", findUserById)
router.patch("patchbyid:id", patchUpdateById)
router.put("/updateuserbyid:id", updateUserById)



export default router