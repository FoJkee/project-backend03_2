import e, {Router} from "express";
import {authController, customValidator} from "../container";
import {
    CodeValidator,
    LoginOrEmailValidator, NewPasswordValidator, RecoveryCodeValidator,
    UserEmailValidator,
    UserLoginValidator,
    UserPasswordValidator
} from "../validator/validators";
import {errorsMiddleware} from "../validator/errorsMiddleware";
import {authBearerMiddleware} from "../validator/authBearerMiddleware";
import {rateLimitDeviceMiddleware} from "../validator/rateLimitDeviceMiddleware";


export const authRouter = Router({})

authRouter.post('/registration',
    // rateLimitDeviceMiddleware,
    UserLoginValidator, UserPasswordValidator,
    UserEmailValidator, customValidator.customEmailValidator.bind(customValidator),
    customValidator.customLoginValidator.bind(customValidator), errorsMiddleware,
    authController.registration.bind(authController))

authRouter.post('/login',
    // rateLimitDeviceMiddleware,
    LoginOrEmailValidator, UserPasswordValidator,
    errorsMiddleware, authController.login.bind(authController))

authRouter.post('/logout', authController.logout.bind(authController))

authRouter.get('/me', authBearerMiddleware, authController.me.bind(authController))

authRouter.post('/registration-confirmation',
    // rateLimitDeviceMiddleware,
    CodeValidator, errorsMiddleware,
    authController.registrationConformation.bind(authController))

authRouter.post('/registration-email-resending',
    // rateLimitDeviceMiddleware,
    UserEmailValidator,
    errorsMiddleware,
    authController.registrationEmailResending.bind(authController))

authRouter.post('/password-recovery',
    rateLimitDeviceMiddleware,
    UserEmailValidator, errorsMiddleware,
    authController.passwordRecovery.bind(authController))

authRouter.post('/new-password',
    rateLimitDeviceMiddleware,
    NewPasswordValidator, RecoveryCodeValidator,
    errorsMiddleware, authController.newPassword.bind(authController))

authRouter.post('/refresh-token', authController.refreshToken.bind(authController))



