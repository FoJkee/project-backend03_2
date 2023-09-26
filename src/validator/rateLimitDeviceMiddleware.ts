import {NextFunction, Request, Response} from "express";
import {RateLimitDeviceService} from "../services/rateLimitDevice-service";


export class RateLimitMiddleware {
    constructor(private rateLimitDeviceService: RateLimitDeviceService) {

    }

    async rateLimitDeviceMiddleware(req: Request, res: Response, next: NextFunction) {

        const url = req.originalUrl || req.baseUrl + req.url
        const ip = req.ip
        const date = new Date()

        await this.rateLimitDeviceService.rateLimitCreate({ip, url, date})

        const rateLimitDevice = await this.rateLimitDeviceService.rateLimitFind(ip, url)

        if (rateLimitDevice > 5) {
            res.sendStatus(429)
            return
        }
        next()
    }

}

