import {Router} from "express";
import {authController, customValidator} from "../container";
import {UserEmailValidator, UserLoginValidator, UserPasswordValidator} from "../validator/validators";
import {errorsMiddleware} from "../validator/errorsMiddleware";


export const authRouter = Router({})


authRouter.post('/registration',
    customValidator.customLoginOrEmailExist.bind(customValidator),
    UserLoginValidator, UserPasswordValidator, UserEmailValidator, errorsMiddleware,
    authController.registration.bind(authController))