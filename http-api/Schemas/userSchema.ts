
import joi from "joi"

export const userSiginupSchema = joi.object({

    id: joi.string().required(),
    email: joi.string().min(8).max(255).required(),
    username: joi.string().min(8).max(255).required(),
    password: joi.string().min(8).max(255).required(),
    mobile: joi.number().min(8).max(255).required()
})