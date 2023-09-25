import {NextFunction, Request, Response} from "express";
import {rateLimitDeviceService} from "../container";


export const rateLimitDeviceMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const url = req.originalUrl
    const ip = req.ip

    await rateLimitDeviceService.rateLimitCreate(ip, url)

    const rateLimitDevice = await rateLimitDeviceService.rateLimitFind(ip, url)

    if (rateLimitDevice > 5) return res.sendStatus(429)
    return next()

}