import {PostRepository} from "../repository/post-repository";
import {PostType, PostTypeView} from "../types/post-type";
import {randomUUID} from "crypto";
import {CommentType, CommentViewType, LikeInfoEnum} from "../types/comment-type";
import {UserRepository} from "../repository/user-repository";
import {BlogRepository} from "../repository/blog-repository";


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


    async getPosts(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<PostTypeView[]> {
        return this.postRepository.getPosts(pageNumber, pageSize, sortBy, sortDirection)
    }

    async getCountPosts(): Promise<number> {
        return this.postRepository.getCountPosts()
    }

    async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise<PostTypeView | null> {
        const id = randomUUID()
        const blog = await this.blogRepository.getBlogId(blogId)
        const blogName = blog!.name

        const newPost = new PostType(
            id,
            title,
            shortDescription,
            content,
            blogId,
            blogName
        )

        return this.postRepository.createPost(newPost)

    }

    async getPostsId(postId: string): Promise<PostTypeView | null> {
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


}