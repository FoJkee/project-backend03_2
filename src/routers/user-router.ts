import {Router} from "express";
import {userController} from "../container";


export const userRouter = Router({})

userRouter.get('/',userController.getUser.bind(userController))
userRouter.post('/', userController.createUser.bind(userController))
userRouter.delete('/:id', userController.deleteUserId.bind(userController))