import {CommentTypeView, LikeInfoEnum} from "../types/comment-type";
import {CommentsRepository} from "../repository/comments-repository";


export class CommentsService {

    constructor(private commentsRepository: CommentsRepository) {

    }

    async updateCommentsId(id: string, content: string): Promise<boolean> {
        return this.commentsRepository.updateCommentsId(id, content)
    }

    // async updateLikeStatus(commentId: string, status: LikeInfoEnum, userId: string ){
    //
    //     const comment = await this.getCommentsId(commentId)
    //     if(!comment) return false
    //
    //
    //
    //
    //
    //
    // }




    async deleteCommentsId(id: string): Promise<boolean> {
        return this.commentsRepository.deleteCommentsId(id)
    }

    async getCommentsId(id: string): Promise<CommentTypeView | null> {
        return this.commentsRepository.getCommentsId(id)
    }

}