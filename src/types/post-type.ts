import {randomUUID} from "crypto";
import e from "express";



export class PostType {

    constructor(
        public id: string = randomUUID(),
        public title: string,
        public shortDescription: string,
        public content: string,
        public blogId: string,
        public blogName: string,
        public createdAt: string = new Date().toISOString(),
        public extendedLikesInfo: extendedLikesInfoType
    ) {

    }
}







export enum LikeInfoEnum {
    None = "None",
    Like = "Like",
    DisLike = "Dislike"
}

export type newestLikesType = {
    addedAt: string,
    userId: string,
    login: string
}

export type extendedLikesInfoType = {
    likesCount: number,
    dislikesCount: number,
    myStatus: LikeInfoEnum
    newestLikes: newestLikesType[]
}


export type PostTypeView = {
    id: string
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
    extendedLikesInfo: extendedLikesInfoType
}

export type PostTypeV = Omit<PostTypeView, "_id">