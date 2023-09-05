import {BlogRepository} from "../repository/blog-repository";
import {BlogType, BlogTypeView} from "../types/blog-type";
import {randomUUID} from "crypto";


export class BlogService {
    constructor(private blogRepository: BlogRepository) {
    }

    async getBlogs(searchNameTerm: string, sortBy: string,
                   sortDirection: string, pageNumber: number, pageSize: number): Promise<BlogTypeView[]> {

        return this.blogRepository.getBlogs(searchNameTerm, sortBy, sortDirection, pageNumber, pageSize)
    }

    async getBlogsCount(searchNameTerm: string): Promise<number> {
        return this.blogRepository.getBlogsCount(searchNameTerm)
    }

    async createBlog(name: string, description: string, websiteUrl: string): Promise<BlogTypeView | null> {

        const newBlog = new BlogType(
            randomUUID(),
            name,
            description,
            websiteUrl,
            new Date().toISOString(),
            false
        )
        return this.blogRepository.createBlog(newBlog)
    }

    async getPostForBlog(blogId: string, pageNumber: number, pageSize: number, sortBy: string, sortDirection: string) {
        return this.blogRepository.getPostForBlog(blogId, pageNumber, pageSize, sortBy, sortDirection)
    }

    async getPostForBlogCount(blogId: string): Promise<number> {
        return this.blogRepository.getPostForBlogCount(blogId)

    }

    async getBlogId(id: string): Promise<BlogTypeView | null> {
        return this.blogRepository.getBlogId(id)
    }

    async updateBlogId(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        return this.blogRepository.updateBlogId(id, name, description, websiteUrl)
    }

    async deleteBlogId(id: string): Promise<boolean> {
        return this.blogRepository.deleteBlogId(id)
    }

    async deleteBlogAll(): Promise<boolean> {
        return this.blogRepository.deleteBlogAll()
    }
}
