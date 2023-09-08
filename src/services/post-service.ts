import {PostRepository} from "../repository/post-repository";
import {PostType, PostTypeView} from "../types/post-type";
import {randomUUID} from "crypto";
import {CommentType, CommentTypeView} from "../types/comment-type";
import {UserRepository} from "../repository/user-repository";


export class PostService {
    constructor(private postRepository: PostRepository, private userRepository: UserRepository) {
    }

    async getCommentByPost(postId: string, pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<CommentTypeView[]> {
        return this.postRepository.getCommentByPost(postId, pageNumber, pageSize, sortBy, sortDirection)
    }

    async getCommentByPostCount(postId: string): Promise<number> {
        return this.postRepository.getCommentByPostCount(postId)
    }

    async createCommentByPost(userId: string, postId: string, content: string): Promise<CommentTypeView | null> {

        const user = await this.userRepository.getUserId(userId)

        const createComment = new CommentType(
            randomUUID(),
            postId,
            content,
            {
                userId: user!.id,
                userLogin: user!.login
            },
            new Date().toISOString()
        )
        return this.postRepository.createCommentByPost(createComment)
    }

    async getPosts(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<PostTypeView[]> {
        return this.postRepository.getPosts(pageNumber, pageSize, sortBy, sortDirection)
    }

    async getCountPosts(): Promise<number> {
        return this.postRepository.getCountPosts()
    }

    async createPost(title: string, shortDescription: string, content: string, blogId: string, blogName: string): Promise<PostTypeView | null> {

        const newPost = new PostType(
            randomUUID(),
            title,
            shortDescription,
            content,
            blogId,
            blogName
        )
        return this.postRepository.createPost(newPost)

    }

    async getPostsId(id: string): Promise<PostTypeView | null> {
        return this.postRepository.getPostsId(id)
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