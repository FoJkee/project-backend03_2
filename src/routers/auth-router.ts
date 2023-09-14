import {Router} from "express";
import {authController, customValidator} from "../container";
import {UserEmailValidator, UserLoginValidator, UserPasswordValidator} from "../validator/validators";
import {errorsMiddleware} from "../validator/errorsMiddleware";


export const authRouter = Router({})


authRouter.post('/registration', UserLoginValidator, UserPasswordValidator, UserEmailValidator,
    customValidator.customEmailValidator.bind(customValidator),
    customValidator.customLoginValidator.bind(customValidator), errorsMiddleware,
    authController.registration.bind(authController))

authRouter.post('/login', UserLoginValidator, UserPasswordValidator, errorsMiddleware,
    authController.login.bind(authController))

