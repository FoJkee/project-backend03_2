import {Router} from "express";
import {authController, customValidator, rateLimitDeviceController} from "../container";
import {
    CodeValidator,
    LoginOrEmailValidator, NewPasswordValidator, RecoveryCodeValidator,
    UserEmailValidator,
    UserLoginValidator,
    UserPasswordValidator
} from "../validator/validators";
import {errorsMiddleware} from "../validator/errorsMiddleware";
import {authBearerMiddleware} from "../validator/authBearerMiddleware";


export const authRouter = Router({})

authRouter.post('/registration',
    rateLimitDeviceController.rateLimitDeviceMiddleware.bind(rateLimitDeviceController),
    UserLoginValidator, UserPasswordValidator,
    UserEmailValidator, customValidator.customEmailValidator.bind(customValidator),
    customValidator.customLoginValidator.bind(customValidator), errorsMiddleware,
    authController.registration.bind(authController))

authRouter.post('/login',
    rateLimitDeviceController.rateLimitDeviceMiddleware.bind(rateLimitDeviceController),
    LoginOrEmailValidator, UserPasswordValidator,
    errorsMiddleware, authController.login.bind(authController))

authRouter.post('/logout', authController.logout.bind(authController))

authRouter.get('/me', authBearerMiddleware, authController.me.bind(authController))

authRouter.post('/registration-confirmation',
    rateLimitDeviceController.rateLimitDeviceMiddleware.bind(rateLimitDeviceController),
    CodeValidator, errorsMiddleware,
    authController.registrationConformation.bind(authController))

authRouter.post('/registration-email-resending',
    rateLimitDeviceController.rateLimitDeviceMiddleware.bind(rateLimitDeviceController),
    UserEmailValidator,
    errorsMiddleware,
    authController.registrationEmailResending.bind(authController))

authRouter.post('/password-recovery',
    rateLimitDeviceController.rateLimitDeviceMiddleware.bind(rateLimitDeviceController),
    UserEmailValidator, errorsMiddleware,
    authController.passwordRecovery.bind(authController))

authRouter.post('/new-password',
    rateLimitDeviceController.rateLimitDeviceMiddleware.bind(rateLimitDeviceController),
    NewPasswordValidator, RecoveryCodeValidator,
    errorsMiddleware, authController.newPassword.bind(authController))

authRouter.post('/refresh-token', authController.refreshToken.bind(authController))



