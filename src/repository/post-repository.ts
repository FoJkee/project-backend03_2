import {PostModel} from "../models/post-model";
import {PostType, PostTypeView} from "../types/post-type";
import {CommentType, CommentViewType} from "../types/comment-type";
import {CommentsModel} from "../models/comments-model";
import {LikeRepository} from "./like-repository";


export class PostRepository {
    constructor(protected likeRepository: LikeRepository) {
    }


    async getCommentByPost(postId: string, pageNumber: number,
                           pageSize: number, sortBy: string, sortDirection: string): Promise<CommentType[]> {

        const filter = {postId}
        return CommentsModel.find(filter, {_id: 0, __v: 0, postId: 0})
            .sort({[sortBy]: sortDirection === 'asc' ? 'asc' : "desc"})
            .skip(pageSize * (pageNumber - 1))
            .limit(pageSize)
    }

    async getCommentByPostCount(postId: string): Promise<number> {
        const filter = {postId}
        return CommentsModel.countDocuments(filter)
    }

    async createCommentByPost(comment: CommentType): Promise<CommentViewType | null> {
        await CommentsModel.create(comment)
        return comment.getViewModel()

    }

    async getCommentsId(id: string): Promise<CommentType | null> {
        return CommentsModel.findOne({id}, {_id: 0, __v: 0, postId: 0})
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

    async getPostsId(id: string, userId: string | null): Promise<PostTypeView | null> {
        // let myStatus = LikeInfoEnum.None
        // if(userId){
        //     const postStatus = await this.likeRepository.getPostStatus(userId, id)
        //     if(postStatus)  myStatus = postStatus.status
        // }

        return  PostModel.findOne({id}, {_id: 0, __v: 0}).lean()




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



