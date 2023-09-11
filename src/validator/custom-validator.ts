import {NextFunction, Request, Response} from "express";
import {UserModel} from "../models/user-model";
import {UserService} from "../services/user-service";
import {log} from "util";


// export const customBlogIdValidator = body('blogId').custom(async (name, {req}) => {
//         const blogData = await blogService.getBlogId(name)
//         if (!blogData) throw new Error()
//         req.body.blogName = blogData.name
//         return true
//     }
// )

export class CustomValidator {

    constructor(private userService: UserService) {
    }

    async customLoginOrEmailExist(req: Request, res: Response, next: NextFunction) {

        const {login, email} = req.body

        const loginUser = await this.userService.findUserByEmailOrLogin(login)

        const emailUser = await this.userService.findUserByEmailOrLogin(email)


        if (loginUser) {
            res.status(400).json({
                errorsMessages: [{
                    message: 'login is already exist',
                    field: 'login'
                }]
            })

        }

        if (emailUser) {
            res.status(400).json({
                errorsMessages: [{
                    message: 'email is already exist',
                    field: 'email'
                }]
            })
            return

        }
        next()
    }

}
