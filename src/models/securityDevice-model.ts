import mongoose from "mongoose";
import {SecurityDeviceTypeView} from "../types/securityDevice-type";

const DeviceSchema = new mongoose.Schema<SecurityDeviceTypeView>({
        userId: {type: String, required: true},
        ip: {type: String, required: true},
        title: {type: String, required: true},
        lastActiveDate: {type: String, required: true},
        deviceId: {type: String, required: true}
    }
)

export const DeviceModel = mongoose.model('device', DeviceSchema)
