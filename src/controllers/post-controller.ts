import {Request, Response} from "express";
import {PostService} from "../services/post-service";

import {blogService} from "./blog-controller";

export const postService = new PostService()

export class PostController {
    async getCommentByPost(req: Request, res: Response) {

    }

    async createCommentByPost(req: Request, res: Response) {

    }

    async getPosts(req: Request, res: Response) {

    }

    async createPost(req: Request, res: Response) {

        const blogId = req.body.blogId
        const title = req.body.title
        const shortDescription = req.body.shortDescription
        const content = req.body.content

        const blog = await blogService.getBlogId(blogId)

        const newPost = await postService.createPost(title, shortDescription, content, blog!.id, req.body.blogName)

        if (newPost) {
            res.status(201).json(newPost)
        } else {
            res.sendStatus(400)
        }


    }

    async getPostsId(req: Request, res: Response) {

    }

    async updatedPostId(req: Request, res: Response) {

    }

    async deletePostId(req: Request, res: Response) {


    }

}