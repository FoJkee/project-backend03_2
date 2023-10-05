import {UserModel} from "../models/user-model";
import {UserType, UserTypeView} from "../types/user-type";
import dateFns from "date-fns/addMinutes";
import {randomUUID} from "crypto";


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

    async findUserByConfirmationCode(code: string): Promise<UserTypeView | null> {
        return UserModel.findOne({"emailConfirmation.codeConfirmation": code})
    }

    async updateUserPassword(passwordHash: string, id: string): Promise<void> {
        await UserModel.findOneAndUpdate({id}, {$set: {passwordHash}})
        return
    }

    async findUserAndUpdateByConfirmationCode(code: string) {
        return UserModel.findOneAndUpdate({'emailConfirmation.codeConfirmation': code},
            {$set: {'emailConfirmation.isConfirmed': true}})
    }

    async updateUserByConfirmationCode(id: string): Promise<UserTypeView | null> {
        return UserModel.findOneAndUpdate({id},
            {
                $set:
                    {
                        "emailConfirmation.codeConfirmation": randomUUID(),
                        "emailConfirmation.expirationDate": dateFns(new Date(), 1000),
                        "emailConfirmation.isConfirmed": false
                    }
            },
            {returnDocument: 'after'})

    }

    async findUserByLogin(login: string) {
        return UserModel.findOne({login})
    }

    async findUserByEmail(email: string) {
        return UserModel.findOne({email})
    }

    async findUserByEmailOrLogin(loginOrEmail: string): Promise<UserTypeView | null> {
        return UserModel.findOne({
            $or: [{email: loginOrEmail},
                {login: loginOrEmail}]
        })
    }


    async createUser(user: UserType): Promise<UserTypeView | null> {
        await UserModel.create(user)
        return this._getUserId(user.id)
    }

    async getUserId(userId: string): Promise<UserTypeView | null> {
        return UserModel.findOne({id: userId})
    }

    async _getUserId(id: string): Promise<UserTypeView | null> {
        return UserModel.findOne({id}, {_id: 0, __v: 0, passwordHash: 0, emailConfirmation: 0})
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