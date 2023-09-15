import {Router} from "express";
import {authController, customValidator} from "../container";
import {
    LoginOrEmailValidator,
    UserEmailValidator,
    UserLoginValidator,
    UserPasswordValidator
} from "../validator/validators";
import {errorsMiddleware} from "../validator/errorsMiddleware";


export const authRouter = Router({})


authRouter.post('/registration', UserLoginValidator, UserPasswordValidator, UserEmailValidator,
    customValidator.customEmailValidator.bind(customValidator),
    customValidator.customLoginValidator.bind(customValidator), errorsMiddleware,
    authController.registration.bind(authController))

authRouter.post('/login', LoginOrEmailValidator, UserPasswordValidator,
    errorsMiddleware, authController.login.bind(authController))

authRouter.post('/logout', authController.logout.bind(authController))

authRouter.get('/me', authController.me.bind(authController))

authRouter.post('/registration-confirmation', errorsMiddleware,
    authController.registrationConformation.bind(authController))

authRouter.post('/registration-email-resending', errorsMiddleware,
    authController.registrationEmailResending.bind(authController))



