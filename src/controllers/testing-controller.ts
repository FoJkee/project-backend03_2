import {Request, Response} from "express";
import {TestingService} from "../services/testing-service";

const testingService = new TestingService()

export class TestingController {
    async deleteAll(req: Request, res: Response) {
        await testingService.deleteAllBlogs()
        await testingService.deleteAllPosts()
        return res.sendStatus(204)
    }


}