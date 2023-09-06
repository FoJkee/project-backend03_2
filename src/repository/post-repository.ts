import {PostModel} from "../models/post-model";
import {PostType, PostTypeView} from "../types/post-type";
import {CommentType, CommentTypeView} from "../types/comment-type";
import {CommentsModel} from "../models/comments-model";


export class PostRepository {


    async getCommentByPost() {

    }

    async createCommentByPost(comment: CommentType): Promise<CommentTypeView | null> {
        return CommentsModel.create(comment)

    }

    async getPosts(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<PostTypeView[]> {
        const filter: any = {}
        return PostModel.find(filter, {_id: 0, __v: 0})
            .sort({[sortBy]: sortDirection === 'asc' ? 'asc' : 'desc'})
            .skip(pageSize * (pageNumber - 1))
            .limit(pageSize)
    }

    async getCountPosts(): Promise<number> {
        const filter: any = {}
        return PostModel.countDocuments(filter)
    }

    async createPost(post: PostType): Promise<PostTypeView | null> {
        return PostModel.create(post)
    }

    async getPostsId(id: string): Promise<PostTypeView | null> {
        return PostModel.findOne({id}, {_id: 0, __v: 0})
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

    async deletePostAll(): Promise<boolean> {
        const result = await PostModel.deleteMany({})
        return result.deletedCount === 1
    }

}