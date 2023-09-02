import {Request, Response} from "express";
import {PostService} from "../services/post-service";

import {pagination} from "./paginations";
import {BlogService} from "../services/blog-service";


export class PostController {

    constructor(private postService: PostService, private blogService: BlogService) {
    }
    async getCommentByPost(req: Request, res: Response) {

    }

    async createCommentByPost(req: Request, res: Response) {

    }

    async getPosts(req: Request, res: Response) {

        const  {pageNumber, pageSize, sortDirection, sortBy} = pagination(req)

        const getPost = await this.postService.getPosts(
            pageNumber,pageSize, sortDirection, sortBy
        )
        const postCount = await this.postService.getCountPosts()

        const result = {
            pagesCount: Math.ceil(postCount / pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: postCount,
            items: getPost
        }

    }

    async createPost(req: Request, res: Response) {

        const blogId = req.body.blogId
        const title = req.body.title
        const shortDescription = req.body.shortDescription
        const content = req.body.content

        const blog = await this.blogService.getBlogId(blogId)

        if (!blog) {
            res.sendStatus(404)
            return
        }

        const newPost = await this.postService.createPost(title, shortDescription, content, blog.id, blog.name)

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