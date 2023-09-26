import {NextFunction, Request, Response} from "express";
import {RateModel} from "../models/rateLimitDevice-model";
import {addSeconds} from "date-fns";


   export const rateLimitDeviceMiddleware =  async (req: Request, res: Response, next: NextFunction) => {

        const url = req.originalUrl
        const ip = req.ip
        const date = new Date()

        const connectionsCount = await RateModel.countDocuments({url, ip, date:
                {$gte: addSeconds(date, -10)}})

        if(connectionsCount + 1 > 5) return res.sendStatus(429)
        await RateModel.create({ip, url , date})

        return next()
    }



