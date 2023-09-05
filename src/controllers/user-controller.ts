import {Request, Response} from "express";
import {UserService} from "../services/user-service";



export class UserController {

    constructor(private userService: UserService) {
    }


    async getUser(req: Request, res: Response){}

    async createUser(req: Request, res: Response){}

    async deleteUserId(req: Request, res: Response){}






}