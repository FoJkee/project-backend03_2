import {PostModel} from "../models/post-model";
import {LikeInfoEnum, PostType} from "../types/post-type";
import {CommentType, CommentViewType} from "../types/comment-type";
import {CommentsModel} from "../models/comments-model";
import {LikeRepository} from "./like-repository";
import {CommentsRepository} from "./comments-repository";
import {PostLikeModel} from "../models/like-model";
import {PostLikeType} from "../types/like-type";
import {log} from "util";


export class PostRepository {
    constructor(protected likeRepository: LikeRepository,
                protected commentsRepository: CommentsRepository,
    ) {
    }

    async getCommentByPost(postId: string, pageNumber: number,
                           pageSize: number, sortBy: string, sortDirection: string, userId: string | null): Promise<CommentType[] | null> {

        const filter = {postId}


        const result = await CommentsModel.find(filter, {_id: 0, __v: 0, postId: 0})
            .sort({[sortBy]: sortDirection === 'asc' ? 'asc' : "desc"})
            .skip(pageSize * (pageNumber - 1))
            .limit(pageSize)


        await result.map(async (comment) => {
            if (userId) {
                const userLiked = await this.commentsRepository.getUserLikeStatus(comment.id, userId);

                if (userLiked) {
                    comment.likesInfo.myStatus = userLiked.status
                }
            }
        })

        return result

    }

    async getCommentByPostCount(postId: string): Promise<number> {
        const filter = {postId}
        return CommentsModel.countDocuments(filter)
    }

    async createCommentByPost(comment: CommentType): Promise<CommentViewType | null> {
        await CommentsModel.create(comment)
        return comment.getViewModel()

    }

    async getCommentsId(id: string): Promise<CommentType | null> {
        return CommentsModel.findOne({id}, {_id: 0, __v: 0, postId: 0})
    }

    async getPosts(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string, userId: string | null): Promise<PostType[]> {


        const result = await PostModel.find({}, {_id: 0, __v: 0})
            .sort({[sortBy]: sortDirection === 'asc' ? 'asc' : 'desc'})
            .skip(pageSize * (pageNumber - 1))
            .limit(pageSize)


        await Promise.all( result.map(async (post) => {

            if (userId) {
                const userLiked = await this.getUserLikeStatusPost(post.id, userId)
                if (userLiked) {
                    post.extendedLikesInfo.myStatus = userLiked.status
                }
            }

            const newestLikes = await this.likeRepository.newestLike(post.id, 3)

            newestLikes.map(l => ({
                login: l.login,
                userId: l.userId,
                addedAt: l.createdAt
            }))
        }))

        return result
    }

    async getCountPosts(): Promise<number> {
        const filter: any = {}
        return PostModel.countDocuments(filter)
    }

    async createPost(post: PostType): Promise<PostType> {
        return PostModel.create(post)


    }

    async getPostsId(id: string, userId: string | null): Promise<PostType | null> {
        const res = await PostModel.findOne({id}, {_id: 0, __v: 0}).lean()
        if (!res) return null

        const newestLikes = await this.likeRepository.newestLike(res.id, 3)

        res.extendedLikesInfo.newestLikes = newestLikes.map(l => ({
            login: l.login,
            userId: l.userId,
            addedAt: l.createdAt
        }))

        return res
    }


    async updatedPostId(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        const result = await PostModel.updateOne({id},
            {
                $set:
                    {
                        title,
                        shortDescription,
                        content,
                        blogId
                    }
            })
        return result.matchedCount === 1

    }

    async deletePostId(id: string): Promise<boolean> {
        const deletePost = await PostModel.deleteOne({id})
        return deletePost.deletedCount === 1

    }

    async deletePostAll(): Promise<boolean> {
        const result = await PostModel.deleteMany({})
        return result.deletedCount === 1
    }

    async getUserLikeStatusPost(id: string, userId: string): Promise<PostLikeType | null> {
        return PostLikeModel.findOne({postId: id, userId})
    }

}



