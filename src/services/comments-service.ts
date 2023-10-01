import {CommentType, LikeInfoEnum} from "../types/comment-type";
import {CommentsRepository} from "../repository/comments-repository";
import {LikeService} from "./like-service";
import {CommentLikesModel} from "../models/like-model";
import {CommentsModel} from "../models/comments-model";
import {CommentLikeType} from "../types/like-type";


export class CommentsService {

    constructor(private commentsRepository: CommentsRepository,
                protected likeService: LikeService) {

    }

    async updateCommentsId(commentId: string, content: string): Promise<boolean> {
        return this.commentsRepository.updateCommentsId(commentId, content)
    }

    async updateLikeStatusComment(commentId: string, status: LikeInfoEnum, userId: string): Promise<boolean> {

        const comment = await this.getCommentsId(commentId)
        if (!comment) return false

        await CommentLikesModel.updateOne(
            {userId, commentId},
            {$set: {status, createdAt: new Date().toISOString()}},
            {upsert: true}
        )
        const [likesCount, dislikesCount] = await Promise.all([
            CommentLikesModel.countDocuments({commentId, status: LikeInfoEnum.Like}),
            CommentLikesModel.countDocuments({commentId, status: LikeInfoEnum.DisLike})
        ])

        comment.likesInfo.likesCount = likesCount
        comment.likesInfo.dislikesCount = dislikesCount


        await CommentsModel.updateOne({id: comment.id}, {$set: {...comment, likesInfo: status}})
        return true

    }

    async getUserLikeStatus(id: string, userId: string): Promise<CommentLikeType | null> {
        return this.commentsRepository.getUserLikeStatus(id, userId)
    }

    async deleteCommentsId(id: string): Promise<boolean> {
        return this.commentsRepository.deleteCommentsId(id)
    }

    async getCommentsId(id: string): Promise<CommentType | null> {
        return this.commentsRepository.getCommentsId(id)
    }

}