import {NextFunction, Request, Response} from "express";
import {jwtService, userService} from "../container";


export const authBearerMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.headers.authorization) return res.sendStatus(401)


    const token = req.headers.authorization.split(' ')[1]
    if (!token) return res.sendStatus(401)

    const userId = await jwtService.getUserIdFromAccessToken(token)
    if (userId) {
        req.userId = await userService.getUserId(userId)
        return next()
    }
    return res.sendStatus(401)

}