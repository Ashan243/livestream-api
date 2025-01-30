
import joi from "joi"

export const userSiginupSchema = joi.object({

    email: joi.string().min(8).max(255).required(),
    username: joi.string().min(8).max(255).required(),
    password: joi.string().min(8).max(255).required(),
    mobile: joi.string().min(8).max(255).required()
})