import {NextFunction, Request, Response} from "express";
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

        const {pageNumber, pageSize, sortDirection, sortBy} = pagination(req)

        const getPost = await this.postService.getPosts(
            pageNumber, pageSize, sortDirection, sortBy
        )
        const postCount = await this.postService.getCountPosts()

        const result = {
            pagesCount: Math.ceil(postCount / pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: postCount,
            items: getPost
        }

        res.status(200).json(result)

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
        const {id} = req.params
        const postId = await this.postService.getPostsId(id)
        if (postId) {
            res.status(200).json(postId)
        } else {
            res.sendStatus(404)
        }

    }

    async updatedPostId(req: Request, res: Response) {
        const {id, blogId} = req.params
        const {title, shortDescription, content} = req.body
        const updatePost = await this.postService.updatedPostId(id, title, shortDescription, content, blogId)

        if (updatePost) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }

    async deletePostId(req: Request, res: Response) {
        const {id} = req.params

        const deletePost = await this.postService.deletePostId(id)
        if (deletePost) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }


    }

}