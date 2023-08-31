import {BlogModels} from "../models/blog-model";
import {BlogClass} from "../services/blog-service";

export class BlogRepository {

    async getBlogs(searchNameTerm: string, sortBy: string,
                   sortDirection: string, pageNumber: number, pageSize: number): Promise<BlogClass[] | null> {

        const filter: any = {name: {$regex: searchNameTerm, $options: 'i'}}


        return BlogModels.find(filter)
            .sort({[sortBy]: sortDirection === 'asc' ? 1 : -1})
            .skip(pageSize * (pageNumber - 1))
            .limit(pageSize)
    }

    async getBlogsCount(searchNameTerm: string): Promise<number> {

        const filter: any = {name: {$regex: searchNameTerm, $options: 'i'}}

        return BlogModels.countDocuments(filter)
    }

    async createBlog(blog: BlogClass): Promise<BlogClass | null> {
        await BlogModels.insertMany(blog)
        return this.getBlogId(blog.id)
    }

    async getBlogId(id: string): Promise<BlogClass | null> {
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
        const result = await BlogModels.deleteMany({id})
        return result.deletedCount === 1
    }

}