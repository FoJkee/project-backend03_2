import {Request, Response} from "express";
import {BlogService} from "../services/blog-service";
import {PostService} from "../services/post-service";
import {UserService} from "../services/user-service";


export class TestingController {

    constructor(private blogService: BlogService,
                private postService: PostService,
                private userService: UserService

    ) {
    }
    async deleteAll(req: Request, res: Response) {
        await this.blogService.deleteBlogAll()
        await this.postService.deletePostAll()
        await this.userService.deleteUserAll()

        return res.sendStatus(204)
    }


}