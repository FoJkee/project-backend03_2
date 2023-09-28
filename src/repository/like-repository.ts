import {LikeType} from "../types/like-type";
import {CommentLikesModel} from "../models/like-model";
import {LikeInfoEnum} from "../types/comment-type";



export class LikeRepository {

    async createCommentStatus(status: LikeType): Promise<LikeType | null> {

        await CommentLikesModel.create(status)
        return this.getCommentStatus(status.userId, status.commentId)
    }

    async getCommentStatus(userId: string, commentId: string): Promise<LikeType | null>{
        return CommentLikesModel.findOne({userId, commentId})
    }

    async deleteLikeServiceAll(){
        return CommentLikesModel.deleteMany({})
    }

    async updateCommentLikeStatus(userId: string, commentId: string,
                                  status: LikeInfoEnum): Promise<LikeType | null>{

        return CommentLikesModel.findOneAndUpdate({userId, commentId}, {status})
    }



}