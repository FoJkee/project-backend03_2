import {PostModel} from "../models/post-model";
import {PostType, PostTypeView} from "../types/post-type";
import {CommentType, CommentTypeView} from "../types/comment-type";
import {CommentsModel} from "../models/comments-model";


export class PostRepository {


    async getCommentByPost(postId: string, pageNumber: number,
                           pageSize: number, sortBy: string, sortDirection: string): Promise<CommentTypeView[]> {

        const filter = {postId}
        return CommentsModel.find(filter, {_id: 0, __v: 0})
            .sort({[sortBy]: sortDirection === 'asc' ? 'asc' : "desc"})
            .skip(pageSize * (pageNumber - 1))
            .limit(pageSize)
    }

    async getCommentByPostCount(postId: string): Promise<number> {
        const filter = {postId}
        return CommentsModel.countDocuments(filter)
    }

    async createCommentByPost(comment: CommentType): Promise<CommentTypeView | null> {
        await CommentsModel.create(comment)
        return {
            id: comment.id,
            content: comment.content,
            commentatorInfo: comment.commentatorInfo,
            createdAt: comment.createdAt
        }


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
                $set:
                    {
                        title,
                        shortDescription,
                        content,
                        blogId
                    }
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



