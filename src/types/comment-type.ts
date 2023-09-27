import {randomUUID} from "crypto";


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
}

export enum LikeInfoEnum {
    None = "None",
    Like = "Like",
    DisLike = 'DisLike'
}

export type LikeInfoType = {
    likesCount: number,
    dislikesCount: number,
    myStatus: LikeInfoEnum
}


export class CommentTypeView  {
    constructor(
        public id: string = randomUUID(),
        public postId: string,
        public content: string,
        public commentatorInfo: {
            userId: string,
            userLogin: string,
        },
        public createdAt: string = new Date().toISOString(),

        public likesInfo: {
            likesCount: number,
            dislikesCount: number,
            myStatus: LikeInfoEnum
        }
    ) {
    }

}