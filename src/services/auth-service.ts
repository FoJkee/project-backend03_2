import {UserService} from "./user-service";
import {UserTypeView} from "../types/user-type";


export class AuthService {

    constructor(private userService: UserService) {

    }

    async checkCredential(loginOrEmail: string, password: string): Promise<UserTypeView | null> {

        const user = await this.userService.findUserByEmailOrLogin(loginOrEmail)
        if (!user) return null

        const result = await this.userService._compareHash(password, user)
        if (!result) return null

        return user

    }


}