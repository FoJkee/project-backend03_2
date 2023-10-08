import {CommentLikeType, PostLikeType} from "../types/like-type";
import {LikeInfoEnum} from "../types/comment-type";
import {LikeRepository} from "../repository/like-repository";
import {PostLikeModel} from "../models/like-model";

export class LikeService {

    constructor(protected likeRepository: LikeRepository) {
    }

    async getCommentStatus(userId: string, commentId: string){
        return this.likeRepository.getCommentStatus(userId, commentId)
    }

    async deleteLikeServiceAll(){
        return this.likeRepository.deleteLikeServiceAll()
    }

    async getPostStatus(userId: string, postId: string): Promise<PostLikeType | null>{
        return this.likeRepository.getPostStatus(userId, postId)
    }


}