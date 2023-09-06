import mongoose, {Schema} from "mongoose";
import {UserTypeView} from "../types/user-type";


const UserSchema = new mongoose.Schema<UserTypeView>({
    id: {type: String, required: true},
    login: {type: String, required: true},
    email: {type: String, required: true},
    createdAt: {type: String, required: true},
    passwordHash: {type: String, required: true},
    emailConformation: {
        codeConfirmation: {type: String, required: true},
        expirationDate: {type: Date, default: null},
        isConfirmed: {type: Boolean, default: false}
    }
})


export const UserModel = mongoose.model<UserTypeView>('user', UserSchema)