import * as jwt from 'jsonwebtoken'
import { env } from 'src/modules/configs/env.config'

const JWT_SECRET = env.JWT_SECRET as string
export const generateToken = (payload : object)=>{
    return jwt.sign(payload , JWT_SECRET ,{ expiresIn: 20000 })
}
