import {randomUUID} from "crypto";


export class UserType {
    constructor(
        public id: string = randomUUID(),
        public login: string,
        public email: string,
        public createdAt: string = new Date().toISOString(),
        public passwordHash: string,
        public emailConfirmation: {
            codeConfirmation: string,
            expirationDate: Date,
            isConfirmed: boolean
        }
    ) {}
}

export type UserTypeView = {
    id: string,
    login: string,
    email: string,
    createdAt: string
    passwordHash: string,
    emailConfirmation: {
        codeConfirmation: string,
        expirationDate: Date,
        isConfirmed: boolean
    }
}