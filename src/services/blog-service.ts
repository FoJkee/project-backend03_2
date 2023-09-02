import {BlogRepository} from "../repository/blog-repository";
import {BlogType} from "../types/blog-type";
import {PostModel} from "../models/post-model";


export class BlogService {
    constructor(private blogRepository: BlogRepository) {
    }

    async getBlogs(searchNameTerm: string, sortBy: string,
                   sortDirection: string, pageNumber: number, pageSize: number): Promise<BlogType[]> {

        return this.blogRepository.getBlogs(searchNameTerm, sortBy, sortDirection, pageNumber, pageSize)
    }

    async getBlogsCount(searchNameTerm: string): Promise<number> {
        return this.blogRepository.getBlogsCount(searchNameTerm)
    }

    async createBlog(name: string, description: string, websiteUrl: string): Promise<BlogType | null> {

        const newBlog = new BlogType(
            new Date().getTime().toString(),
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

    async getBlogId(id: string): Promise<BlogType | null> {
        return this.blogRepository.getBlogId(id)

    }

    async updateBlogId(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        return this.blogRepository.updateBlogId(id, name, description, websiteUrl)
    }

    async deleteBlogId(id: string): Promise<boolean> {
        return this.blogRepository.deleteBlogId(id)
    }
}
