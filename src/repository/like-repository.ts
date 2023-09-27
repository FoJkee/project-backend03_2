import {LikeType} from "../types/like-type";
import {CommentLikesModel} from "../models/like-model";



export class LikeRepository {

    async createCommentStatus(status: LikeType): Promise<LikeType | null> {
        await CommentLikesModel.create(status)
        return this.getCommentStatus(status.userId, status.commentId)

    }

    async getCommentStatus(userId: string, commentId: string): Promise<LikeType | null>{
        return CommentLikesModel.findOne({userId, commentId})
    }



}