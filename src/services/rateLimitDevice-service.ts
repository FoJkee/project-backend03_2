import {RateLimit, RateLimitView} from "../types/securityDevice-type";
import {RateLimitDeviceRepository} from "../repository/rateLimitDevice-repository";


export class RateLimitDeviceService {
    constructor(private rateLimitDeviceRepository: RateLimitDeviceRepository) {
    }

    async rateLimitCreate(limitDevice: RateLimit) {

        return this.rateLimitDeviceRepository.rateLimitCreate(limitDevice)
    }

    async rateLimitFind(ip: string, url: string): Promise<number> {
        return this.rateLimitDeviceRepository.rateLimitFind(ip, url)
    }

}