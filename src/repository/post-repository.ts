import {PostModel} from "../models/post-model";
import {PostType} from "../types/post-type";


export class PostRepository {

    async getCommentByPost() {

    }

    async createCommentByPost() {

    }

    async getPosts() {

    }

    async createPost(post: PostType): Promise<PostType | null> {
        return PostModel.create(post)
    }

    async getPostsId(id: string) {
        return PostModel.findOne({id})
    }

    async updatedPostId(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        const result = await PostModel.updateOne({id},
            {
                title,
                shortDescription,
                content,
                blogId
            })
        return result.matchedCount === 1

    }

    async deletePostId(id: string): Promise<boolean> {
        const deletePost = await PostModel.deleteOne({id})
        return deletePost.deletedCount === 1

    }
}