import {CommentTypeView} from "../types/comment-type";
import {CommentsRepository} from "../repository/comments-repository";


export class CommentsService {

    constructor(private commentsRepository: CommentsRepository) {

    }


    async updateCommentsId(id: string, content: string): Promise<boolean> {
        return this.commentsRepository.updateCommentsId(id, content)

    }

    async deleteCommentsId(id: string): Promise<boolean> {
        return this.commentsRepository.deleteCommentsId(id)
    }

    async getCommentsId(id: string): Promise<CommentTypeView | null> {
        return this.commentsRepository.getCommentsId(id)
    }

}