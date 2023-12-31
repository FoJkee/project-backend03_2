import {CommentLikesModel, PostLikeModel} from "../models/like-model";
import {LikeInfoEnum} from "../types/post-type";
import {PostLikeType} from "../types/like-type";


export class LikeRepository {
    constructor() {
    }

    async deleteLikeServiceAll() {
        return CommentLikesModel.deleteMany({})
    }

    async newestLike(postId: string, num: number): Promise<PostLikeType[]> {
        return PostLikeModel
            .find({postId, status: LikeInfoEnum.Like}, {_id: 0, __v: 0})
            .sort({createdAt: -1})
            .limit(num)

    }

}