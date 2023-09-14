import {SecurityDeviceType, SecurityDeviceTypeView} from "../types/securityDevice-type";
import {SecurityDeviceRepository} from "../repository/securityDevice-repository";
import {DeviceModel} from "../models/securityDevice-model";


export class SecurityDeviceService {
    constructor(private securityDeviceRepository: SecurityDeviceRepository) {
    }

    async createDevice(userId: string, deviceId: string, ip: string, title: string,
                       iat: string): Promise<SecurityDeviceTypeView | null>{

        const newDevice = new SecurityDeviceType(
            userId,
            ip,
            title,
            new Date(iat).toISOString(),
            deviceId

        )
        return this.securityDeviceRepository.createDevice(newDevice)
    }

    async getDeviceId(deviceId: string): Promise<SecurityDeviceTypeView | null> {
        return this.securityDeviceRepository.getDeviceId(deviceId)
    }

    async deleteSessionsId(deviceId: string){
        return this.securityDeviceRepository.deleteSessionsId(deviceId)
    }

    async deleteAllOtherSessions(userId: string, deviceId: string){
        return this.securityDeviceRepository.deleteAllOtherSessions(userId, deviceId)
    }


    async deleteDeviceAll(){
        return this.securityDeviceRepository.deleteDeviceAll()
    }
}