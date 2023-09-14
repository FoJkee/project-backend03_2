
export class SecurityDeviceType {
    constructor(
        public userId: string,
        public ip: string,
        public title: string,
        public lastActiveDate: string,
        public deviceId: string
    ) {
    }
}

export type SecurityDeviceTypeView = {
    userId: string,
    ip: string,
    title: string,
    lastActiveDate: string,
    deviceId: string
}