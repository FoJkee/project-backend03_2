import {PostRepository} from "../repository/post-repository";
import {PostType, PostTypeView} from "../types/post-type";
import {randomUUID} from "crypto";
import {CommentType, CommentTypeView} from "../types/comment-type";


export class PostService {
    constructor(private postRepository: PostRepository) {
    }

    async getCommentByPost() {

    }

    async createCommentByPost(userId: string, postId: string, content: string) {

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

    async deletePostAll(): Promise<boolean>{
        return this.postRepository.deletePostAll()
    }


}