import {BlogModels} from "../models/blog-model";
import {PostModel} from "../models/post-model";

export class TestingRepository {

    async deleteAllBlogs(): Promise<boolean>{
      const result =  await BlogModels.deleteMany({})
        return result.deletedCount === 1
    }

    async deleteAllPosts(): Promise<boolean>{
        const result = await PostModel.deleteMany({})
        return result.deletedCount === 1
    }
}
