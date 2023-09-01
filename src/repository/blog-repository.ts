import {BlogModels} from "../models/blog-model";
import {BlogType} from "../types/blog-type";

export class BlogRepository {

    async getBlogs(searchNameTerm: string, sortBy: string,
                   sortDirection: string, pageNumber: number, pageSize: number): Promise<BlogType[]> {

        const filter = {name: {$regex: searchNameTerm, $options: 'i'}}

        const blogs = await BlogModels.find(filter)
            .sort({[sortBy]: sortDirection === 'asc' ? 'asc' : 'desc'})
             .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)

        return blogs

    }

    async getBlogsCount(searchNameTerm: string): Promise<number> {

        const filter: any = {name: {$regex: searchNameTerm, $options: 'i'}}

        return BlogModels.countDocuments(filter)
    }

    async createBlog(blog: BlogType): Promise<BlogType | null> {
        return  BlogModels.create(blog)
    }

    async createPostForBlog(){


    }









    async getBlogId(id: string): Promise<BlogType | null> {
        return BlogModels.findOne({id})
    }

    async updateBlogId(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const result = await BlogModels.updateOne({id}, {
            name,
            description,
            websiteUrl
        })
        return result.matchedCount === 1
    }

    async deleteBlogId(id: string): Promise<boolean> {
        const result = await BlogModels.deleteOne({id})
        return result.deletedCount === 1
    }

}