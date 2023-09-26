import {RateLimit, RateLimitView} from "../types/securityDevice-type";
import {RateModel} from "../models/rateLimitDevice-model";
import dateFns from "date-fns/addMinutes";


export class RateLimitDeviceRepository {

    // async rateLimitCreate(limitDevice: RateLimit): Promise<void> {
    //     // await RateModel.insertMany(limitDevice)
    //     await RateModel.create(limitDevice)
    //
    // }
    //
    // async rateLimitFind(ip: string, url: string): Promise<number> {
    //     return  RateModel.find({
    //         ip,
    //         url,
    //         date: {$gte: dateFns(new Date(), -10)}
    //     })
    //
    // }
}