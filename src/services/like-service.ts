import {LikeType} from "../types/like-type";
import {LikeInfoEnum} from "../types/comment-type";
import {LikeRepository} from "../repository/like-repository";

const likeRepository = new LikeRepository()
export class LikeService {

    constructor(protected likeRepository: LikeRepository) {
    }

    async createCommentStatus(userId: string, commentId: string): Promise<LikeType | null> {

        const status = new LikeType(
            userId,
            commentId,
            LikeInfoEnum.None,
            new Date().toISOString()
        )

        return this.likeRepository.createCommentStatus(status)

    }


}