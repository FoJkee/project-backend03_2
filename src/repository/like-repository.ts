import {CommentLikeType, PostLikeType} from "../types/like-type";
import {CommentLikesModel, PostLikeModel} from "../models/like-model";
import {LikeInfoEnum} from "../types/comment-type";



export class LikeRepository {

    async createCommentStatus(status: CommentLikeType): Promise<CommentLikeType | null> {

        await CommentLikesModel.create(status)
        return this.getCommentStatus(status.userId, status.commentId)
    }

    async getCommentStatus(userId: string, commentId: string): Promise<CommentLikeType | null>{
        return CommentLikesModel.findOne({userId, commentId})
    }

    async deleteLikeServiceAll(){
        return CommentLikesModel.deleteMany({})
    }

    async updateCommentLikeStatus(userId: string, commentId: string,
                                  status: LikeInfoEnum): Promise<CommentLikeType | null>{

        return CommentLikesModel.findOneAndUpdate({userId, commentId}, {status})
    }

    async getPostStatus(userId: string, postId: string): Promise<PostLikeType | null>{
        return PostLikeModel.findOne({userId, postId}).lean()
    }

    async getNewestLike(postId: string, num: number){}



}