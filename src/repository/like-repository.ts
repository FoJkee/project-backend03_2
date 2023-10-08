import {CommentLikeType, PostLikeType} from "../types/like-type";
import {CommentLikesModel, PostLikeModel} from "../models/like-model";
import {LikeInfoEnum} from "../types/comment-type";



export class LikeRepository {


    async getCommentStatus(userId: string, commentId: string): Promise<CommentLikeType | null>{
        return CommentLikesModel.findOne({userId, commentId})
    }

    async deleteLikeServiceAll(){
        return CommentLikesModel.deleteMany({})
    }

    async getPostStatus(userId: string, postId: string): Promise<PostLikeType | null>{
        return PostLikeModel.findOne({userId, postId})
    }


}