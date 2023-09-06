import {UserRepository} from "../repository/user-repository";
import {UserType, UserTypeView} from "../types/user-type";
import {randomUUID} from "crypto";
import bcrypt from 'bcrypt'
import dateFns from 'date-fns/addMinutes'

export class UserService {

    constructor(private userRepository: UserRepository) {
    }

    async getUser(sortBy: string, sortDirection: string, pageNumber: number,
                  pageSize: number, searchLoginTerm: string | null, searchEmailTerm: string | null): Promise<UserTypeView[]> {
        return this.userRepository.getUser(sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm)
    }

    async getUserCount(searchLoginTerm: string | null, searchEmailTerm: string | null): Promise<number>{
        return  this.userRepository.getUserCount(searchLoginTerm, searchEmailTerm)
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

    async findUserId(){

    }


    async deleteUserId(id: string): Promise<boolean> {
        return this.userRepository.deleteUserId(id)
    }

    async deleteUserAll(): Promise<boolean> {
        return this.userRepository.deleteUserAll()
    }

    async _generateHash(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt)

    }

}