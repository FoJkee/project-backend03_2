import {Response, Request} from "express";
import {BlogClass, BlogService} from "../services/blog-service";
import {pagination} from "./paginations";


const blogService = new BlogService()

export class BlogController {
    async getBlog(req: Request, res: Response) {

        // const pageNumber = Number(req.query.pageNumber) || 1
        // const pageSize = Number(req.query.pageSize) || 10
        // const sortDirection = req.query.sortDirection === 'asc' ? 'asc' : 'desc'
        // const sortBy = req.query.sortBy ? req.query.sortBy.toString() : 'createdAt'
        // const searchNameTerm = req.query.searchNameTerm ? req.query.searchNameTerm.toString() : null

        const {
            searchNameTerm, sortBy,
            sortDirection, pageSize, pageNumber
        } = pagination(req)

        const getBlogs = await blogService.getBlogs(
            searchNameTerm,
            sortBy,
            sortDirection,
            pageSize,
            pageNumber
        )
        console.log("getBlogs", getBlogs)

        // const itemBlog = getBlogs?.map(el => ({
        //     id: el.id,
        //     name: el.name,
        //     description: el.description,
        //     websiteUrl: el.websiteUrl,
        //     createdAt: el.createdAt,
        //     isMembership: el.isMembership
        // }))

        const blogCount = await blogService.getBlogsCount(searchNameTerm)

        const result = {
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
        try {

        } catch (e) {

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
        try {

        } catch (e) {

        }

    }
}