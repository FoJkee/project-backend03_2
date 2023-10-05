import mongoose from "mongoose";
import {LikeInfoEnum, PostType} from "../types/post-type";


const PostSchema = new mongoose.Schema<PostType>({
    id: {type: String, required: true},
    title: {type: String, required: true},
    shortDescription: {type: String, required: true},
    content: {type: String, required: true},
    blogId: {type: String, required: true},
    blogName: {type: String, required: true},
    createdAt: {type: String, required: true},
    extendedLikesInfo: {
        likesCount:{type: Number, default:0},
        dislikesCount: {type: Number, default: 0},
        myStatus: {type: String, default: LikeInfoEnum.None, enum: LikeInfoEnum},
        newestLikes: [
            {
                addedAt: {type: String, required: true},
                userId: {type: String, required: true},
                login: {type: String, required: true}
            }
        ]
    }

})

export const PostModel= mongoose.model<PostType>('posts', PostSchema)