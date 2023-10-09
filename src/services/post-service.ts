import {PostRepository} from "../repository/post-repository";
import {LikeInfoEnum, newestLikesType, PostType, PostTypeView} from "../types/post-type";
import {randomUUID} from "crypto";
import {CommentType, CommentViewType} from "../types/comment-type";
import {UserRepository} from "../repository/user-repository";
import {BlogRepository} from "../repository/blog-repository";
import {PostLikeModel} from "../models/like-model";
import {PostModel} from "../models/post-model";
import {PostLikeType} from "../types/like-type";


export class PostService {
    constructor(private postRepository: PostRepository,
                private userRepository: UserRepository,
                private blogRepository: BlogRepository) {
    }

    async getCommentByPost(postId: string, pageNumber: number, pageSize: number,
                           sortBy: string, sortDirection: string, userId: string | null): Promise<CommentType[] | null> {
        return this.postRepository.getCommentByPost(postId, pageNumber, pageSize, sortBy, sortDirection, userId)
    }

    async getCommentByPostCount(postId: string): Promise<number> {
        return this.postRepository.getCommentByPostCount(postId)
    }

    async createCommentByPost(userId: string, postId: string, content: string): Promise<CommentViewType | null> {

        const user = await this.userRepository.getUserId(userId)
        if (!user) return null

        const createComment = new CommentType(
            randomUUID(),
            postId,
            content,
            {
                userId: user.id,
                userLogin: user.login
            },
            new Date().toISOString(),
            {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: LikeInfoEnum.None
            }
        )

        return this.postRepository.createCommentByPost(createComment)
    }

    async updateLikeStatusPost(postId: string, status: LikeInfoEnum, userId: string) {
        const post = await this.getPostsId(postId)
        if (!post) return null

        await PostLikeModel.updateOne({postId, userId}, {
            $set: {status, createdAt: new Date().toISOString()}
        }, {upsert: true})

        const [likesCount, dislikesCount] = await Promise.all([

            PostLikeModel.countDocuments({postId, status: LikeInfoEnum.Like}),
            PostLikeModel.countDocuments({postId, status: LikeInfoEnum.DisLike})

        ])

        post.extendedLikesInfo.likesCount = likesCount
        post.extendedLikesInfo.dislikesCount = dislikesCount

        await PostModel.updateOne({id: post.id}, {$set: {...post, extendedLikesInfo: status}})
        return true

    }


    async getPosts(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string, userId: string | null): Promise<PostType[]> {
        return this.postRepository.getPosts(pageNumber, pageSize, sortBy, sortDirection, userId)
    }

    async getCountPosts(): Promise<number> {
        return this.postRepository.getCountPosts()
    }

    async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise<PostType> {

        const blog = await this.blogRepository.getBlogId(blogId)
        const blogName = blog!.name


        const newPost = new PostType(
            randomUUID(),
            title,
            shortDescription,
            content,
            blogId,
            blogName,
            new Date().toISOString(),
            {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: LikeInfoEnum.None,
                newestLikes: []
            }
        )

        return this.postRepository.createPost(newPost)

    }

    async getPostsId(postId: string): Promise<PostType | null> {
        return this.postRepository.getPostsId(postId)
    }

    async updatedPostId(id: string, title: string, shortDescription: string,
                        content: string, blogId: string): Promise<boolean> {
        return this.postRepository.updatedPostId(id, title, shortDescription, content, blogId)
    }

    async deletePostId(id: string): Promise<boolean> {
        return this.postRepository.deletePostId(id)
    }

    async deletePostAll(): Promise<boolean> {
        return this.postRepository.deletePostAll()
    }

    async getUserLikeStatusPost(postId: string, userId: string): Promise<PostLikeType | null> {
        return this.postRepository.getUserLikeStatusPost(postId, userId)
    }


}