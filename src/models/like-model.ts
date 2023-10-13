import mongoose from "mongoose";
import {CommentLikeType, PostLikeType} from "../types/like-type";
import {LikeInfoEnum} from "../types/post-type";


const CommentLikeSchema = new mongoose.Schema<CommentLikeType>({
    userId: {type: String, required: true},
    commentId: {type: String, required: true},
    status: {type: String, required: true},
    createdAt: {type: String, required: true}
})

export const CommentLikesModel = mongoose.model('comment-like', CommentLikeSchema)


const PostLikeSchema = new mongoose.Schema<PostLikeType>({
    userId: {type: String, required: true},
    postId: {type: String, required: true},
    login: {type: String, required: true},
    status: {type: String, required: true},
    createdAt: {type: String, required: true}
})

export const PostLikeModel = mongoose.model('post-like', PostLikeSchema)


