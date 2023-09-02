import {PostRepository} from "../repository/post-repository";
import {PostType} from "../types/post-type";


export class PostService {
    constructor(private postRepository: PostRepository) {
    }
    async getCommentByPost() {

    }

    async createCommentByPost() {

    }

    async getPosts(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<PostType[]> {
        return this.postRepository.getPosts(pageNumber, pageSize, sortBy, sortDirection)
    }

    async getCountPosts(): Promise<number>{
        return this.postRepository.getCountPosts()
    }

    async createPost(title: string, shortDescription: string, content: string, blogId: string, blogName: string): Promise<PostType | null> {

        const newPost = new PostType(
            new Date().getTime().toString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName,
            new Date().toISOString()
        )
        return this.postRepository.createPost(newPost)

    }

    async getPostsId(id: string) {
        return this.postRepository.getPostsId(id)
    }

    async updatedPostId(id: string, title: string, shortDescription: string,
                        content: string, blogId: string): Promise<boolean> {
        return this.postRepository.updatedPostId(id, title, shortDescription, content, blogId)
    }

    async deletePostId(id: string) {


    }


}