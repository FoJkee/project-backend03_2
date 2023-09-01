import {NextFunction, Request, Response} from "express";


export const authBasicAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const code = Buffer.from('admin:qwerty', "utf-8").toString("base64")

    if (req.headers.authorization === `Basic ${code}`) {
        next()
    } else {
        res.sendStatus(401)
    }

}