import {Router} from "express";
import {TestingController} from "../controllers/testing-controller";


const testingController = new TestingController()
export const testingRouter = Router({})

testingRouter.delete('/', testingController.deleteAll)