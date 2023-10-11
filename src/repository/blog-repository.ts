import {BlogModels} from "../models/blog-model";
import {BlogType, BlogTypeView} from "../types/blog-type";
import {PostModel} from "../models/post-model";

export class BlogRepository {

    async getBlogs(searchNameTerm: string, sortBy: string,
                   sortDirection: string, pageNumber: number, pageSize: number): Promise<BlogTypeView[]> {

        const filter = {name: {$regex: searchNameTerm, $options: 'i'}}

        return BlogModels.find(filter, {_id: 0, __v: 0})
            .sort({[sortBy]: sortDirection === 'asc' ? 'asc' : 'desc'})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
    }

    async getBlogsCount(searchNameTerm: string): Promise<number> {

        const filter: any = {name: {$regex: searchNameTerm, $options: 'i'}}

        return BlogModels.countDocuments(filter)
    }

    async createBlog(blog: BlogType): Promise<BlogTypeView | null> {
        return BlogModels.create(blog)
    }

    async getPostForBlog(blogId: string, pageNumber: number, pageSize: number, sortBy: string, sortDirection: string) {
        return PostModel
            .find({blogId}, {_id: 0, __v: 0})
            .sort({[sortBy]: sortDirection === 'asc' ? 'asc' : 'desc'})
            .skip(pageSize * (pageNumber - 1))
            .limit(pageSize)
    }

    async getPostForBlogCount(blogId: string): Promise<number> {
        return PostModel.countDocuments({blogId})
    }

    async getBlogId(id: string): Promise<BlogType | null> {
        return BlogModels.findOne({id}, {_id: 0, __v: 0})
    }

    async updateBlogId(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const result = await BlogModels.updateOne({id}, {
            $set:
                {
                    name,
                    description,
                    websiteUrl
                }
        })
        return result.matchedCount === 1
    }

    async deleteBlogId(id: string): Promise<boolean> {
        const result = await BlogModels.deleteOne({id})
        return result.deletedCount === 1
    }

    async deleteBlogAll(): Promise<boolean> {
        const result = await BlogModels.deleteMany({})
        return result.deletedCount === 1
    }

}