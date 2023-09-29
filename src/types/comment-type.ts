import {randomUUID} from "crypto";

export type CommentViewType = {
    id: string
    content: string
    commentatorInfo: {
        userId: string
        userLogin: string
    },
    createdAt: string
    likesInfo: {
        likesCount: number,
        dislikesCount: number,
        myStatus: LikeInfoEnum
    }
}

export class CommentType {
    constructor(
        public id: string = randomUUID(),
        public postId: string,
        public content: string,
        public commentatorInfo: {
            userId: string,
            userLogin: string,
        },
        public createdAt: string = new Date().toISOString(),
        public likesInfo: LikeInfoType
    ) {
    }

    public getViewModel(): CommentViewType {
        return {
            id: this.id,
            content: this.content,
            commentatorInfo: {
                userId: this.commentatorInfo.userId,
                userLogin: this.commentatorInfo.userLogin
            },
            createdAt: this.createdAt,
            likesInfo: {
                likesCount: this.likesInfo.likesCount,
                dislikesCount: this.likesInfo.dislikesCount,
                myStatus: this.likesInfo.myStatus
            }
        }
    }
}

export enum LikeInfoEnum {
    None = "None",
    Like = "Like",
    DisLike = 'Dislike'
}

export type LikeInfoType = {
    likesCount: number,
    dislikesCount: number,
    myStatus: LikeInfoEnum
}

