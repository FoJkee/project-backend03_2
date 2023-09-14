import {SecurityDeviceService} from "../services/securityDevice-service";
import {Request, Response} from "express";
import {JwtService} from "../services/jwt-service";

export class SecurityDeviceController {

    constructor(private securityDeviceService: SecurityDeviceService,
                private jwtService: JwtService) {
    }

    async getDevice(req: Request, res: Response) {
        const refreshToken = req.body.refreshToken
        const dataToken = await this.jwtService.verifyUserById(refreshToken)
        if (!dataToken) {
            res.sendStatus(401)
        } else {
            const device = await this.securityDeviceService.getDeviceId(dataToken.userId)
            res.status(200).json(device)
        }
    }

    async deleteDevice(req: Request, res: Response) {
        const refreshToken = req.body.refreshToken
        const dataToken = await this.jwtService.verifyUserById(refreshToken)
        if (!dataToken) {
            res.sendStatus(401)
        } else {
            await this.securityDeviceService.deleteAllOtherSessions(dataToken.userId, dataToken.userId)
            res.sendStatus(204)
        }
    }

    async deleteDeviceId(req: Request, res: Response) {

        const refreshToken = req.body.refreshToken
        const deviceId = req.body.deviceId
        const dataToken = await this.jwtService.verifyUserById(refreshToken)
        const findDeviceId = await this.securityDeviceService.getDeviceId(deviceId)

        if (!findDeviceId) return res.sendStatus(404)

        if (findDeviceId && findDeviceId.userId !== dataToken!.userId) return res.sendStatus(403)

        const result = await this.securityDeviceService.deleteSessionsId(deviceId)
        if (result) res.sendStatus(404)
        return res.sendStatus(204)

    }
}