import {randomUUID} from "crypto";


// export interface PostInterface {
//     title: string,
//     shortDescription: string,
//     content: string,
//     blogId: string
//     blogName: string
// }


export class PostType {

    constructor(
        public id: string = randomUUID(),
        public title: string,
        public shortDescription: string,
        public content: string,
        public blogId: string,
        public blogName: string,
        public createdAt: string = new Date().toISOString()) {
    }

}


export type PostTypeView = {
    id: string
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}