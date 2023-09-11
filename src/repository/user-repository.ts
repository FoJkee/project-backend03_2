import {UserModel} from "../models/user-model";
import {UserType, UserTypeView} from "../types/user-type";


export class UserRepository {

    async getUser(sortBy: string, sortDirection: string, pageNumber: number,
                  pageSize: number, searchLoginTerm: string | null, searchEmailTerm: string | null): Promise<UserTypeView[]> {

        const filter: any = {}
        if (searchLoginTerm) {
            filter.login = {$regex: searchLoginTerm, $options: 'i'}
        }
        if (searchEmailTerm) {
            filter.email = {$regex: searchEmailTerm, $options: 'i'}
        }
        if (searchLoginTerm && searchEmailTerm) {
            filter.$or = [
                {login: {$regex: searchLoginTerm, $options: 'i'}},
                {email: {$regex: searchEmailTerm, $options: 'i'}}
            ]
        }
        return UserModel.find(filter, {_id: 0, __v: 0, passwordHash: 0, emailConformation: 0})
            .sort({[sortBy]: sortDirection === 'asc' ? 'asc' : 'desc'})
            .skip(pageSize * (pageNumber - 1))
            .limit(pageSize)
    }

    async getUserCount(searchLoginTerm: string | null, searchEmailTerm: string | null): Promise<number> {
        const filter: any = {}
        if (searchLoginTerm) {
            filter.login = {$regex: searchLoginTerm, $options: 'i'}
        }
        if (searchEmailTerm) {
            filter.email = {$regex: searchEmailTerm, $options: 'i'}
        }
        if (searchLoginTerm && searchEmailTerm) {
            filter.$or = [
                {login: {$regex: searchLoginTerm, $options: 'i'}},
                {email: {$regex: searchEmailTerm, $options: 'i'}}
            ]
        }
        return UserModel.countDocuments(filter)
    }

    async findUserByEmailOrLogin(loginOrEmail: string) {
        return UserModel.findOne({$or: [{email: loginOrEmail}, {login: loginOrEmail}]})
    }


    async createUser(user: UserType): Promise<UserTypeView | null> {
        return UserModel.create(user)
    }

    async getUserId(userId: string): Promise<UserType | null> {
        return UserModel.findOne({userId})
    }



    async deleteUserId(id: string): Promise<boolean> {
        const result = await UserModel.deleteOne({id})
        return result.deletedCount === 1
    }

    async deleteUserAll() {
        const result = await UserModel.deleteMany({})
        return result.deletedCount === 1
    }

}