
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


export class RateLimit  {
    constructor(
        public ip: string | string[],
        public url: string,
        public date: Date
    ) {
    }
}

export type RateLimitView =  {
     ip: string | string[],
     url: string,
     date: Date

}