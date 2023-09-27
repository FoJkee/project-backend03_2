import mongoose from "mongoose";
import {LikeType} from "../types/like-type";


const CommentLikeSchema = new mongoose.Schema<LikeType>({
    userId: {type: String, required: true},
    commentId: {type: String, required: true},
    status: {type: String, required: true}
})

export  const CommentLikesModel = mongoose.model('comment-like', CommentLikeSchema)


