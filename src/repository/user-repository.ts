import {UserModel} from "../models/user-model";
import {UserType, UserTypeView} from "../types/user-type";


export class UserRepository {

    async getUser() {
    }

    async createUser(user: UserType) {
    }

    async getUserLoginOrEmail(){

    }

    async deleteUserId(id: string): Promise<boolean> {
        const result = await UserModel.deleteOne({id})
        return result.deletedCount === 1
    }

    async deleteUserAll(){
        const result = await UserModel.deleteMany({})
        return result.deletedCount === 1
    }

}