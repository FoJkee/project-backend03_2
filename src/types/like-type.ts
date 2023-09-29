import {LikeInfoEnum} from "./comment-type";

export class CommentLikeType {
    constructor(
        public userId: string,
        public commentId: string,
        public status: LikeInfoEnum,
        public createdAt: string
    ) {
    }
}


export class PostLikeType {
    constructor(
        public userId: string,
        public login: string,
        public status: LikeInfoEnum,
        public createdAt: string
    ) {
    }

}