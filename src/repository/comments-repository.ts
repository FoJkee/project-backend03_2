import {CommentsModel} from "../models/comments-model";
import {CommentType, LikeInfoEnum} from "../types/comment-type";
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

    // async updateLikeStatus(comment: CommentType, statusCheck: LikeInfoEnum, dataLikeStatus: CommentLikeType): Promise<boolean> {
    //
    //     const filter: any = {}
    //
    //     const {userId, status, commentId} = dataLikeStatus
    //
    //     if (statusCheck === LikeInfoEnum.None) {
    //
    //         if (status === LikeInfoEnum.None) {
    //             statusCheck = LikeInfoEnum.None
    //         }
    //         if (status === LikeInfoEnum.Like) {
    //             filter.$inc = {'likesInfo.likesCount': -1}
    //             statusCheck = LikeInfoEnum.None
    //         }
    //         if (status === LikeInfoEnum.DisLike) {
    //             filter.$inc = {'likesInfo.dislikesCount': -1}
    //             statusCheck = LikeInfoEnum.None
    //         }
    //     }
    //     if (statusCheck === LikeInfoEnum.Like) {
    //
    //         if (status === LikeInfoEnum.None) {
    //             filter.$inc = {'likesInfo.likesCount': 1}
    //             statusCheck = LikeInfoEnum.Like
    //         }
    //         if (status === LikeInfoEnum.DisLike) {
    //             filter.$inc = {'likesInfo.dislikesCount': -1, 'likesInfo.likesCount': 1}
    //             statusCheck = LikeInfoEnum.Like
    //         }
    //         if (status === LikeInfoEnum.Like) {
    //             statusCheck = LikeInfoEnum.Like
    //         }
    //     }
    //     if (statusCheck === LikeInfoEnum.DisLike) {
    //
    //         if (status === LikeInfoEnum.DisLike) {
    //             statusCheck = LikeInfoEnum.DisLike
    //         }
    //         if (status === LikeInfoEnum.None) {
    //             filter.$inc = {'likesInfo.dislikesCount': 1}
    //             statusCheck = LikeInfoEnum.DisLike
    //         }
    //         if (status === LikeInfoEnum.Like) {
    //             filter.$inc = {'likesInfo.dislikesCount': 1, 'likesInfo.likesCount': -1}
    //         }
    //     }
    //
    //     await CommentsModel.findOneAndUpdate({id: comment.id}, filter)
    //     await this.likeRepository.updateCommentLikeStatus(userId, commentId, statusCheck)
    //     return true
    // }

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