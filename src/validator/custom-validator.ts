import {UserService} from "../services/user-service";
import {body} from "express-validator";
import {BlogService} from "../services/blog-service";


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

    customCodeValidator = body('code').custom(async (code) => {
        const codeData = await this.userService.findUserByConfirmationCode(code)
        if(codeData) throw new Error('email is already confirmed')
        return true
    })




}
