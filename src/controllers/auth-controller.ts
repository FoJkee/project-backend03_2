import {Request, Response} from "express";
import {UserService} from "../services/user-service";
import {EmailService} from "../services/email-service";


export class AuthController {

    constructor(private userService: UserService, private emailService: EmailService) {
    }


    // регистрация создается, но письмо не улетает
    async registration(req: Request, res: Response) {

        const {login, email, password} = req.body


        const createUser = await this.userService.createUser(login, email, password)

        if (!createUser) {
            res.sendStatus(404)
            return
        }
        const user = await this.userService.getUserId(createUser.id)
        if (!user) {
            res.sendStatus(404)
            return
        }

        const sendEmail = await this.emailService.sendEmail(email,
            user.emailConformation.codeConfirmation)

        res.sendStatus(204)


    }

    async login(req: Request, res: Response) {

    }

    async logout(req: Request, res: Response) {
    }

    async me(req: Request, res: Response) {
    }


}