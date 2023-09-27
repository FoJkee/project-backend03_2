import {CommentsModel} from "../models/comments-model";
import {CommentType, CommentTypeView, LikeInfoEnum} from "../types/comment-type";


export class CommentsRepository {

    async updateCommentsId(id: string, content: string): Promise<boolean> {
        const result = await CommentsModel.updateOne({id}, {$set: {content}})
        return result.matchedCount === 1

    }
    async updateLikeStatus(commentId: string, status: LikeInfoEnum, userId: string ){







    }

    async deleteCommentsId(id: string): Promise<boolean> {
        const result = await CommentsModel.deleteOne({id})
        return result.deletedCount === 1
    }

    async getCommentsId(id: string): Promise<CommentType | null> {
        return CommentsModel.findOne({id}, {_id: 0, __v: 0})
    }


}