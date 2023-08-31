import mongoose from "mongoose";

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

export const CommentsModel = mongoose.model('comments', CommentsSchema)
