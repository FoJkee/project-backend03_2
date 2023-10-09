import {CommentLikeType, PostLikeType} from "../types/like-type";
import {LikeInfoEnum} from "../types/comment-type";
import {LikeRepository} from "../repository/like-repository";
import {PostLikeModel} from "../models/like-model";

export class LikeService {

    constructor(protected likeRepository: LikeRepository) {
    }


    async deleteLikeServiceAll(){
        return this.likeRepository.deleteLikeServiceAll()
    }



}