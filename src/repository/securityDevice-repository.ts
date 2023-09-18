import {SecurityDeviceType, SecurityDeviceTypeView} from "../types/securityDevice-type";
import {DeviceModel} from "../models/securityDevice-model";


export class SecurityDeviceRepository {

    async createDevice(newDevice: SecurityDeviceType): Promise<SecurityDeviceTypeView | null> {
        return DeviceModel.create(newDevice)
    }

    async updateDevice(userId: string, title: string, lastActiveDate: string, deviceId: string) {
        return DeviceModel.findOneAndUpdate({userId}, {$set: {title, lastActiveDate, deviceId}})
    }

    async getDeviceId(deviceId: string): Promise<SecurityDeviceTypeView | null> {
        return DeviceModel.findOne({deviceId})
    }

    async deleteSessionsId(deviceId: string) {
        return DeviceModel.deleteOne({deviceId})
    }

    async deleteAllOtherSessions(userId: string, deviceId: string) {
        return DeviceModel.deleteMany({userId, deviceId: {$ne: deviceId}})
    }

    async deleteDeviceAll() {
        return DeviceModel.deleteMany({})
    }

    async deleteDeviceId(deviceId: string) {
        return DeviceModel.deleteOne({deviceId})
    }

}