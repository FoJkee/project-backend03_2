import mongoose from "mongoose";
import {CommentTypeView} from "../types/comment-type";

const CommentsSchema = new mongoose.Schema({
    id: {type: String, required: true},
    postId: {type: String, required: true},
    content: {type: String, required: true},
    commentatorInfo: {
        userId: {type: String, required: true},
        userLogin: {type: String, required: true}
    },
    createdAt: {type: String, required: true}

})

export const CommentsModel = mongoose.model<CommentTypeView>('comments', CommentsSchema)


