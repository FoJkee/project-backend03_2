import {LikeInfoEnum} from "./comment-type";

export class LikeType {
    constructor(
        public userId: string,
        public commentId: string,
        public status: LikeInfoEnum,
        public createdAt: string
    ) {
    }
}