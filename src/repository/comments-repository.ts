import {CommentsModel} from "../models/comments-model";
import {CommentType} from "../types/comment-type";
import {CommentLikeType} from "../types/like-type";
import {LikeRepository} from "./like-repository";
import {CommentLikesModel} from "../models/like-model";


export class CommentsRepository {

    constructor(protected likeRepository: LikeRepository) {
    }

    async updateCommentsId(commentId: string, content: string): Promise<boolean> {
        const result = await CommentsModel.updateOne({commentId}, {$set: {content}})
        return result.matchedCount === 1
    }

    async getUserLikeStatus(id: string, userId: string): Promise<CommentLikeType | null>{
        return  CommentLikesModel.findOne({commentId: id, userId})
    }

    async deleteCommentsId(id: string): Promise<boolean> {
        const result = await CommentsModel.deleteOne({id})
        return result.deletedCount === 1
    }

    async getCommentsId(id: string): Promise<CommentType | null> {
        return CommentsModel.findOne({id}, {_id: 0, __v: 0, postId: 0})
    }


}