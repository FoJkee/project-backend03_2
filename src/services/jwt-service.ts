import {UserTypeView} from "../types/user-type";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import {TokenPayload} from "../types/jwt-type";
import {UserService} from "./user-service";

dotenv.config()


const jwtSecret = process.env.JWT_SECRET || '123'


export class JwtService {
    constructor(protected userService: UserService) {
    }

    async createJwtAccessToken(user: UserTypeView): Promise<string> {
        return jwt.sign({userId: user.id}, jwtSecret, {expiresIn: '600000'})
    }

    async createJwtRefreshToken(user: UserTypeView, deviceId: string): Promise<string> {
        return jwt.sign({userId: user.id, deviceId}, jwtSecret, {expiresIn: "20000"})
    }

    async verifyUserById(token: string): Promise<TokenPayload | null> {
        try {
            const result: any = jwt.verify(token, jwtSecret)
            console.log(result)
            return {
                userId: result.user,
                deviceId: result.deviceId
            }
        } catch {
            return null
        }
    }

    async getUserIdFromAccessToken(token: string): Promise<string | null> {
        try {
            const result: any = jwt.verify(token, jwtSecret)
            return result.userId
        } catch {
            return null
        }
    }

    async getLastActiveDateFromToken(token: string) {
        const result: any = jwt.decode(token)
        return new Date(result!.iat * 1000).toISOString()
    }



}