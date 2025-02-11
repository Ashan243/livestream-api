import { CookieOptions, Request, Response } from "express"

import * as gConfig from "../Config/globalconfig"


const generateRefreshTokenCookie = (res: Response, name: string = "refreshToken", val: any, config: CookieOptions = gConfig.default.REFRESH_TOKEN_CONFIG  ) => {
    console.log(config)     
    return res.cookie(name, val, config )
   }



export {
    generateRefreshTokenCookie
   }