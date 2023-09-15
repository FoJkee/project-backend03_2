import {UserTypeView} from "./user-type";

declare global {
    declare namespace Express {

        export interface Request {
            userId: UserTypeView | null
        }
    }
}