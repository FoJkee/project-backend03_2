import {Request, Response} from "express";
import {UserService} from "../services/user-service";
import {randomUUID} from "crypto";
import {AuthService} from "../services/auth-service";
import {JwtService} from "../services/jwt-service";


export class AuthController {

    constructor(private userService: UserService,
                private authService: AuthService,
                private jwtService: JwtService) {
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

        // if (createUser) {
        //    return await this.emailService.sendEmail(email, createUser!.emailConformation.codeConfirmation)
        // }
        return createUser ? res.sendStatus(204) : res.sendStatus(400)

    }

    async login(req: Request, res: Response) {
        const deviceName = req.headers['user-agent']
        const deviceId = randomUUID()

        const {loginOrEmail, password} = req.body

        const user = await this.authService.checkCredential(loginOrEmail, password)

        if(!user) {
            res.sendStatus(401)
        } else {
            // const token = await this.jwtService.createJwtAccessToken(user)
        }







    }

    async logout(req: Request, res: Response) {
    }

    async me(req: Request, res: Response) {
    }


}