import {CommentLikeType} from "../types/like-type";
import {LikeInfoEnum} from "../types/comment-type";
import {LikeRepository} from "../repository/like-repository";

export class LikeService {

    constructor(protected likeRepository: LikeRepository) {
    }

    async createCommentStatus(userId: string, commentId: string): Promise<CommentLikeType | null> {

        const status = new CommentLikeType(
            userId,
            commentId,
            LikeInfoEnum.None,
            new Date().toISOString()
        )

        return this.likeRepository.createCommentStatus(status)

    }

    async getCommentStatus(userId: string, commentId: string){
        return this.likeRepository.getCommentStatus(userId, commentId)
    }

    async deleteLikeServiceAll(){
        return this.likeRepository.deleteLikeServiceAll()
    }


}