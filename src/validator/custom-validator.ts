import {NextFunction, Request, Response} from "express";
import {UserService} from "../services/user-service";
import {body} from "express-validator";
import {BlogService} from "../services/blog-service";
import {tr} from "date-fns/locale";


export class CustomValidator {

    constructor(private userService: UserService, private blogService: BlogService) {
    }

    customBlogIdValidator = body('blogId').custom(async (name) => {
        const blogData = await this.blogService.getBlogId(name)
        if (!blogData) throw new Error()
        return true
    })

    customLoginValidator = body('login').custom(async (login) => {
        const loginData = await this.userService.findUserByLogin(login)
        if (loginData) throw new Error('login exists')
        return true
    })

    customEmailValidator = body('email').custom(async (email) => {
        const emailData = await this.userService.findUserByEmail(email)
        if (emailData) throw new Error('email exists')
        return true

    })
}
