import {RateLimit, RateLimitView} from "../types/securityDevice-type";
import {RateLimitDeviceRepository} from "../repository/rateLimitDevice-repository";


export class RateLimitDeviceService {
    constructor(private rateLimitDeviceRepository: RateLimitDeviceRepository) {
    }

    async rateLimitCreate(ip: string, url: string) {
        const limitDevice = new RateLimit(
            ip,
            url,
            new Date()
        )

        return this.rateLimitDeviceRepository.rateLimitCreate(limitDevice)
    }

    async rateLimitFind(ip: string, url: string) {
        return this.rateLimitDeviceRepository.rateLimitFind(ip, url)
    }

}