
import jwt from "jsonwebtoken"

class tokenService{

   //{id: this_id}
    static generateToken(payload: object, secret: string,  expiresIn: string)  {
        return jwt.sign(payload, secret, {expiresIn: expiresIn})
    }
}

export default tokenService