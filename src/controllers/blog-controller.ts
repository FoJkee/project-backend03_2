import {Response, Request} from "express";
import {BlogService} from "../services/blog-service";
import {pagination} from "./paginations";
import {BlogType, Paginated} from "../types/blog-type";
import {postService} from "./post-controller";


export const blogService = new BlogService()

export class BlogController {
    async getBlog(req: Request, res: Response) {

        // const pageNumber = Number(req.query.pageNumber) || 1
        // const pageSize = Number(req.query.pageSize) || 10
        // const sortDirection = req.query.sortDirection === 'asc' ? 'asc' : 'desc'
        // const sortBy = req.query.sortBy ? req.query.sortBy.toString() : 'createdAt'
        // const searchNameTerm = req.query.searchNameTerm ? req.query.searchNameTerm.toString() : null

        const {
            pageNumber, pageSize, sortDirection, sortBy,
            searchNameTerm
        } = pagination(req)

        const getBlogs = await blogService.getBlogs(
            searchNameTerm,
            sortBy,
            sortDirection,
            pageNumber,
            pageSize,
        )

        const blogCount = await blogService.getBlogsCount(searchNameTerm)

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

        const name = req.body.name
        const description = req.body.description
        const websiteUrl = req.body.websiteUrl

        const newBlog = await blogService.createBlog(name, description, websiteUrl)
        if (newBlog) {
            res.status(201).json(newBlog)
        } else {
            res.sendStatus(400)
        }
    }

    async getPostForBlog(req: Request, res: Response) {

    }



    async createPostForBlog(req: Request, res: Response) {

        const blogId = req.params.blogId
        const title = req.body.title
        const shortDescription = req.body.shortDescription
        const content = req.body.content

        const blog = await blogService.getBlogId(blogId)
        const newPost = await postService.createPost(title, shortDescription, content, blog!.id, blog!.name)

        if(newPost){
            res.status(201).json(newPost)
        } else {
            res.sendStatus(404)
        }


    }


    async getBlogId(req: Request, res: Response) {
        const id = req.params.id
        const blogId = await blogService.getBlogId(id)
        if (blogId) {
            res.status(200).json(blogId)
        } else {
            res.sendStatus(404)
        }


    }

    async updateBlogId(req: Request, res: Response) {
        const id = req.params.id
        const name = req.body.name
        const description = req.body.description
        const websiteUrl = req.body.websiteUrl

        const updateBlog = await blogService.updateBlogId(id, name, description, websiteUrl)

        if (updateBlog) {
            res.status(204).json(updateBlog)
        } else {
            res.sendStatus(404)
        }

    }

    async deleteBlogId(req: Request, res: Response) {
        const id = req.params.id

        const deleteBlog = await blogService.deleteBlogId(id)
        if (deleteBlog) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }

    }
}