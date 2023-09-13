import {UserType, UserTypeView} from "../types/user-type";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import {TokenPayload} from "../types/jwt-type";

dotenv.config()


const jwtSecret = process.env.JWT_SECRET || ''


export class JwtService {


    async createJwtAccessToken(user: UserTypeView): Promise<string> {
        return jwt.sign({userId: user.id}, jwtSecret, {expiresIn: '1000'})
    }

    async createJwtRefreshToken(user: UserType, deviceId: string): Promise<string> {
        return jwt.sign({userId: user.id, deviceId}, jwtSecret, {expiresIn: "2000"})
    }

    async verifyUserById(token: string): Promise<TokenPayload | null> {
        try {
            const result: any = jwt.verify(token, jwtSecret)
            return {
                userId: result.user,
                deviceId: result.deviceId
            }
        } catch {
            return null
        }
    }

}