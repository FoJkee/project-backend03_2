import {Request, Response} from "express";
import {UserService} from "../services/user-service";
import {EmailService} from "../services/email-service";
import {fi} from "date-fns/locale";


export class AuthController {

    constructor(private userService: UserService, private emailService: EmailService) {
    }

    private errMes = (value: string) => {
        return {
            errorsMessages: [{
                message: `${value} created`,
                field: `${value}`
            }]
        }
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



    }

    async logout(req: Request, res: Response) {
    }

    async me(req: Request, res: Response) {
    }


}