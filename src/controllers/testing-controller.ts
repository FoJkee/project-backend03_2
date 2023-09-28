import {Request, Response} from "express";
import {BlogService} from "../services/blog-service";
import {PostService} from "../services/post-service";
import {UserService} from "../services/user-service";
import {SecurityDeviceService} from "../services/securityDevice-service";
import {LikeService} from "../services/like-service";


export class TestingController {

    constructor(private blogService: BlogService,
                private postService: PostService,
                private userService: UserService,
                private securityDeviceService: SecurityDeviceService,
                private likeService: LikeService

    ) {
    }
    async deleteAll(req: Request, res: Response) {
        await this.blogService.deleteBlogAll()
        await this.postService.deletePostAll()
        await this.userService.deleteUserAll()
        await this.securityDeviceService.deleteDeviceAll()
        await this.likeService.deleteLikeServiceAll()


        return res.sendStatus(204)
    }


}