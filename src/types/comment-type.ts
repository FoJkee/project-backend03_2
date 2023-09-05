import {randomUUID} from "crypto";


export class CommentType {
    constructor(
        public id: string = randomUUID(),
        public postId: string = randomUUID(),
        public content: string,
        public commentatorInfo: {
            userId: string,
            userLogin: string,
        },
        public createdAt: string = new Date().toISOString()
    ) {
    }
}


export type CommentTypeView = {
    id: string
    postId: string
    content: string,
    commentatorInfo: {
        userId: string,
        userLogin: string,
    },
    createdAt: string
}