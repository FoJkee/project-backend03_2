import {CommentType, LikeInfoEnum} from "../types/comment-type";
import {CommentsRepository} from "../repository/comments-repository";
import {LikeService} from "./like-service";


export class CommentsService {

    constructor(private commentsRepository: CommentsRepository,
                protected likeService: LikeService) {

    }

    async updateCommentsId(commentId: string, content: string): Promise<boolean> {
        return this.commentsRepository.updateCommentsId(commentId, content)
    }

    async updateLikeStatus(commentId: string, status: LikeInfoEnum, userId: string): Promise<boolean> {

        const comment = await this.getCommentsId(commentId)
        if (!comment) return false

        const likeStatus = await this.likeService.getCommentStatus(userId, comment.id)

        if(!likeStatus){
            await this.likeService.createCommentStatus(userId, commentId)
            return false
        }

        return this.commentsRepository.updateLikeStatus(comment, status, likeStatus)
    }

    async deleteCommentsId(id: string): Promise<boolean> {
        return this.commentsRepository.deleteCommentsId(id)
    }

    async getCommentsId(id: string): Promise<CommentType | null> {
        return this.commentsRepository.getCommentsId(id)
    }

}