import {Response, Request} from "express";
import {BlogService} from "../services/blog-service";
import {pagination} from "./paginations";
import {BlogType, Paginated} from "../types/blog-type";
import {PostService} from "../services/post-service";


export class BlogController {
    constructor(private blogService: BlogService, private postService: PostService) {
    }

    async getBlog(req: Request, res: Response) {

        const searchNameTerm = req.query.searchNameTerm ? req.query.searchNameTerm.toString() : ''

        const {pageNumber, pageSize, sortDirection, sortBy} = pagination(req)

        const getBlogs = await this.blogService.getBlogs(
            searchNameTerm,
            sortBy,
            sortDirection,
            pageNumber,
            pageSize,
        )

        const blogCount = await this.blogService.getBlogsCount(searchNameTerm)

        const result: Paginated<BlogType> = {
            pagesCount: Math.ceil(blogCount / pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: blogCount,
            items: getBlogs
        }
        res.status(200).json(result)
    }

    async createBlog(req: Request, res: Response) {

        const {name, description, websiteUrl} = req.body

        const newBlog = await this.blogService.createBlog(name, description, websiteUrl)
        if (newBlog) return res.status(201).json(newBlog)
        return res.sendStatus(400)

    }

    async getPostForBlog(req: Request, res: Response) {
        const {blogId} = req.params
        const {pageNumber, pageSize, sortBy, sortDirection} = pagination(req)

        const getPostsForBlog = await this.blogService.getPostForBlog(
            blogId, pageNumber, pageSize, sortBy, sortDirection)

        const getPostsForBlogCount = await this.blogService.getPostForBlogCount(blogId)

        const result = {
            pagesCount: Math.ceil(getPostsForBlogCount / pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: getPostsForBlogCount,
            items: getPostsForBlog
        }

        res.status(200).json(result)
    }

    async createPostForBlog(req: Request, res: Response) {

        const {blogId} = req.params

        const {title, shortDescription, content} = req.body

        const blog = await this.blogService.getBlogId(blogId)
        if (!blog) {
            res.sendStatus(404)
            return
        }
        const newPost = await this.postService.createPost(title, shortDescription, content,
            blog.id, blog.name)

        if (newPost) {
            res.status(201).json(newPost)
        } else {
            res.sendStatus(404)
        }

    }


    async getBlogId(req: Request, res: Response) {
        const id = req.params.id
        const blogId = await this.blogService.getBlogId(id)
        if (blogId) {
            res.status(200).json(blogId)
        } else {
            res.sendStatus(404)
        }


    }

    async updateBlogId(req: Request, res: Response) {

        const {id} = req.params
        const {name, description, websiteUrl} = req.body


        const updateBlog = await this.blogService.updateBlogId(id, name, description, websiteUrl)

        if (updateBlog) {
            res.status(204).json(updateBlog)
        } else {
            res.sendStatus(404)
        }

    }

    async deleteBlogId(req: Request, res: Response) {
        const id = req.params.id

        const deleteBlog = await this.blogService.deleteBlogId(id)
        if (deleteBlog) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }

    }
}