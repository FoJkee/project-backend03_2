import {UserRepository} from "../repository/user-repository";
import {UserType, UserTypeView} from "../types/user-type";
import {randomUUID} from "crypto";
import bcrypt from 'bcrypt'

import dateFns from 'date-fns/addMinutes'
export class UserService {

    constructor(private userRepository: UserRepository) {
    }

    async getUser() {
    }


    async createUser(login: string, email: string, password: string): Promise<UserTypeView | null> {

        const salt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, salt)

        const newUser = new UserType(
            randomUUID(),
            login,
            email,
            new Date().toISOString(),
            passwordHash,
            {
                codeConfirmation: randomUUID(),
                expirationDate: dateFns(new Date(), 10),
                isConfirmed: false
            }
        )
        return this.userRepository.createUser(newUser)

    }


    async deleteUserId(id: string): Promise<boolean> {
        return this.userRepository.deleteUserId(id)
    }

    async deleteUserAll(): Promise<boolean> {
        return this.userRepository.deleteUserAll()
    }

    async _generateHash(password: string, salt: string){
        return bcrypt.hash(password, salt)

    }


}