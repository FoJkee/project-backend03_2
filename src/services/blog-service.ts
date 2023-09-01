import {BlogRepository} from "../repository/blog-repository";
import {BlogType} from "../types/blog-type";

export const blogRepository = new BlogRepository()

export class BlogService {

    async getBlogs(searchNameTerm: string, sortBy: string,
                   sortDirection: string, pageNumber: number, pageSize: number): Promise<BlogType[]> {

        return blogRepository.getBlogs(searchNameTerm, sortBy, sortDirection, pageNumber, pageSize)
    }

    async getBlogsCount(searchNameTerm: string): Promise<number> {
        return blogRepository.getBlogsCount(searchNameTerm)
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
        return blogRepository.createBlog(newBlog)
    }

    async createPostForBlog(blogId: string, title: string, shortDescription: string, content:string){


    }

    async getBlogId(id: string): Promise<BlogType | null> {
        return blogRepository.getBlogId(id)

    }

    async updateBlogId(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        return blogRepository.updateBlogId(id, name, description, websiteUrl)
    }

    async deleteBlogId(id: string): Promise<boolean> {
        return blogRepository.deleteBlogId(id)
    }
}
