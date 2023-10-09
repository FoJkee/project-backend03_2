import {CommentLikesModel} from "../models/like-model";



export class LikeRepository {

    async deleteLikeServiceAll(){
        return CommentLikesModel.deleteMany({})
    }

}