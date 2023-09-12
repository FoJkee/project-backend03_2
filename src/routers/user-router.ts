import {Router} from "express";
import {customValidator, userController} from "../container";
import {authBasicAuthMiddleware} from "../validator/authBasicAuthMiddleware";
import {UserEmailValidator, UserLoginValidator, UserPasswordValidator} from "../validator/validators";


export const userRouter = Router({})

userRouter.get('/', authBasicAuthMiddleware, userController.getUser.bind(userController))

userRouter.post('/', authBasicAuthMiddleware, UserLoginValidator, UserPasswordValidator, UserEmailValidator,
    userController.createUser.bind(userController))

userRouter.delete('/:id', authBasicAuthMiddleware, userController.deleteUserId.bind(userController))