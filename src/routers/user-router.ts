import {Router} from "express";
import {userController} from "../container";
import {authBasicMiddleware} from "../validator/authBasicMiddleware";
import {UserEmailValidator, UserLoginValidator, UserPasswordValidator} from "../validator/validators";
import {errorsMiddleware} from "../validator/errorsMiddleware";


export const userRouter = Router({})

userRouter.get('/', authBasicMiddleware, userController.getUser.bind(userController))

userRouter.post('/', authBasicMiddleware, UserLoginValidator, UserPasswordValidator, UserEmailValidator,
    errorsMiddleware,
    userController.createUser.bind(userController))

userRouter.delete('/:id', authBasicMiddleware, userController.deleteUserId.bind(userController))