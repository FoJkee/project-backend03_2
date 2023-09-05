import {Router} from "express";
import {testController} from "../container";


export const testingRouter = Router({})

testingRouter.delete('/', testController.deleteAll.bind(testController))