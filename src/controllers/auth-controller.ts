import {Request, Response} from "express";
import {UserService} from "../services/user-service";
import {randomUUID} from "crypto";
import {AuthService} from "../services/auth-service";
import {JwtService} from "../services/jwt-service";
import {SecurityDeviceService} from "../services/securityDevice-service";
import {EmailService} from "../services/email-service";


export class AuthController {

    constructor(private userService: UserService,
                private authService: AuthService,
                private jwtService: JwtService,
                private securityDeviceService: SecurityDeviceService,
                private emailService: EmailService
    ) {
    }

    // регистрация создается, но письмо не улетает
    async registration(req: Request, res: Response) {

        const {login, email, password} = req.body

        // const findLogin = await this.userService.findUserByLogin(login)
        // if (findLogin) {
        //     return res.status(400).json(this.errMes('login'))
        // }
        // const findEmail = await this.userService.findUserByEmail(email)
        //
        // if (findEmail) {
        //     return res.status(400).json(this.errMes('email'))
        // }

        const createUser = await this.userService.createUser(login, email, password)

        if (createUser) {
            return await this.emailService.sendEmail(email,
                "Registration",
                `<h1>Registation</h1>
            <p>To finish registration please follow the link below:
             <a href='https://somesite.com/confirm-email?code=${
                    createUser!.emailConformation.codeConfirmation}'>complete registration</a>
            </p>`
            )
        }
        return createUser ? res.sendStatus(204) : res.sendStatus(400)

    }

    async login(req: Request, res: Response) {

        const deviceName = req.headers['user-agent'] || ''
        const deviceId = randomUUID()
        const ip = req.ip

        const {loginOrEmail, password} = req.body

        const user = await this.authService.checkCredential(loginOrEmail, password)

        if (!user) {
            res.sendStatus(401)

        } else {

            const accessToken = await this.jwtService.createJwtAccessToken(user)
            const refreshToken = await this.jwtService.createJwtRefreshToken(user, deviceId)
            const lastActiveDate = await this.jwtService.getLastActiveDateFromToken(refreshToken)

            await this.securityDeviceService.createDevice(user.id, deviceId, ip, deviceName, lastActiveDate)

            res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: true})

            res.status(200).json({accessToken: accessToken})
        }
    }

// не происходит удаление
    async logout(req: Request, res: Response) {
        const refreshToken = req.body.refreshToken
        const dataToken = await this.jwtService.verifyUserById(refreshToken)
        if (dataToken) {
            await this.securityDeviceService.deleteSessionsId(dataToken.deviceId)
            res.clearCookie("refreshToken").sendStatus(204)
        } else {
            res.sendStatus(401)
        }
    }

    async me(req: Request, res: Response) {

        const user = await this.userService.getUserId(req.userId?.id!)
        if (!user) return res.sendStatus(401)

        const {email, login, id} = user

        return res.status(200).json({
            email,
            login,
            userId: id
        })

    }

    async passwordRecovery(req: Request, res: Response) {

        const {email} = req.body

        const user = await this.userService.findUserByEmailOrLogin(email)
        if (!user) return res.sendStatus(400)
        const updateUser = await this.userService.updateUserByConfirmationCode(user.id)
        if (!updateUser) return res.sendStatus(400)
        await this.emailService.sendEmail(email,
            "Email resending confirmation",
            `<h1>Password recovery confirmation</h1>
            <p>To finish password recovery please follow the link below:
             <a href='https://somesite.com/confirm-email?code=${
                updateUser!.emailConformation.codeConfirmation}'>recovery password</a>
            </p>`)
        return res.sendStatus(204)
    }

    async newPassword(req: Request, res: Response) {

        const {newPassword, recoveryCode} = req.body
        const user = await this.userService.findUserByConfirmationCode(recoveryCode)
        const updateUser = await this.userService.updateUserPassword(newPassword, user!.id)

        if (!updateUser) return res.sendStatus(400)

        return res.sendStatus(204)
    }

// обновляем через юзера или через девайс?
    async refreshToken(req: Request, res: Response) {

        const deviceName = req.headers['user-agent'] || ''
        const refreshToken = req.body.refreshToken

        const payloadToken = await this.jwtService.getLastActiveDateFromToken(refreshToken)
        if (!payloadToken) return res.sendStatus(401)

        const dataToken = await this.jwtService.verifyUserById(refreshToken)
        const user = await this.userService.getUserId(dataToken!.userId)

        const accessToken = await this.jwtService.createJwtAccessToken(user!)
        const newRefreshToken = await this.jwtService.createJwtRefreshToken(user!, dataToken!.deviceId)

        const newPayloadToken = await this.jwtService.getLastActiveDateFromToken(newRefreshToken)

        await this.securityDeviceService.updateDevice(user!.id, deviceName, newPayloadToken, dataToken!.deviceId)
        res.cookie('refreshToken', newRefreshToken, {httpOnly: true, secure: true})
        return res.status(200).json({accessToken: accessToken})


    }

    async registrationConformation(req: Request, res: Response) {
        const code = req.body.code
        await this.userService.findUserAndUpdateByConfirmationCode(code)
        res.sendStatus(204)
    }

    // проблема с отправкой емайла
    async registrationEmailResending(req: Request, res: Response) {
        const email = req.body.email
        const user = await this.userService.findUserByEmailOrLogin(email)

        if (!user) return res.sendStatus(404)
        const updateUser = await this.userService.updateUserByConfirmationCode(user.id)

        const sendEmail = await this.emailService.sendEmail(email,
            "Email resending confirmation",
            `<h1>Email resending confirmation</h1>
            <p>To finish email resending please follow the link below:
             <a href='https://somesite.com/confirm-email?code=${
                updateUser!.emailConformation.codeConfirmation}'>complete registration</a>
            </p>`
        )

        if (!sendEmail) return res.sendStatus(404)

        return res.sendStatus(204)

    }

}