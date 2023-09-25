import {NextFunction, Request, Response} from "express";
import {RateLimitDeviceService} from "../services/rateLimitDevice-service";



export class RateLimitMiddleware {
    constructor(private rateLimitDeviceService: RateLimitDeviceService) {

    }
    async rateLimitDeviceMiddleware (req: Request, res: Response, next: NextFunction)  {

        const url = req.originalUrl
        const ip = req.ip

        await this.rateLimitDeviceService.rateLimitCreate(ip, url)

        const rateLimitDevice = await this.rateLimitDeviceService.rateLimitFind(ip, url)

        if (rateLimitDevice > 5) return res.sendStatus(429)
        return next()

    }

}

