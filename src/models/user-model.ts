import mongoose, {Schema} from "mongoose";


const UserSchema = new mongoose.Schema({
    id: {type: String, required: true},
    login: {type: String, required:  true},
    email: {type: String, required: true},
    createdAt: {type: String, required: true},
    passwordHash: {type: String, required: true},
    codeConfirmation: {
        codeConfirmation: {type: String, required: true},
        expirationDate: {type: Date, default: null},
        isConfirmed: {type: Boolean, default: false}
    }
})



export const UserModel = mongoose.model('user', UserSchema)