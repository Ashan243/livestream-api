import joi, { ObjectSchema } from "joi"
import { Request, Response, NextFunction }from "express"







export const validateSchema = (schema: ObjectSchema) =>{
    return (req: Request, res: Response, next: NextFunction) =>{
        const {error} = schema.validate(req.body, {abortEarly: false})
        if(error){
            res.status(400).json({errors: error.details.map((details) => ({
                message: details.message,
                field: details.path.join(".")
            })
        )})
        return
        }
       
        next()
    }
}