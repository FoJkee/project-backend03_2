import {Request, Response} from "express";
import {UserService} from "../services/user-service";
import {pagination} from "./paginations";


export class UserController {

    constructor(protected userService: UserService) {
    }


    async getUser(req: Request, res: Response) {
        const {pageNumber, pageSize, sortBy, sortDirection} = pagination(req)

        const searchLoginTerm = req.query.searchLoginTerm ? req.query.searchLoginTerm.toString() : null
        const searchEmailTerm = req.query.searchEmailTerm ? req.query.searchEmailTerm.toString() : null

        const getUser = await this.userService.getUser(
            sortBy,
            sortDirection,
            pageNumber,
            pageSize,
            searchLoginTerm,
            searchEmailTerm
        )

        const userCount = await this.userService.getUserCount(searchLoginTerm, searchEmailTerm)

        const userResult = {
            pagesCount: Math.ceil(userCount / pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: userCount,
            items: getUser
        }
        res.status(200).json(userResult)
    }

    async createUser(req: Request, res: Response) {
        const {login, email, password} = req.body
        const newUser = await this.userService.createUser(login, email, password)
        if (newUser) {
            res.status(201).json(newUser)
        } else {
            res.sendStatus(400)
        }

    }

    async deleteUserId(req: Request, res: Response) {
        const {id} = req.params
        const deleteUser = await this.userService.deleteUserId(id)
        if (deleteUser) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }

    }


}